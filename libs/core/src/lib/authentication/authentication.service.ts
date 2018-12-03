import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import { map } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials;

  constructor(private http: HttpClient) {
    if (!localStorage || !sessionStorage) {
      return;
    }
    this._credentials = JSON.parse(sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey));
  }

  /**
   * Gets the user credentials.
   */
  get credentials(): Credentials {
    return this._credentials;
  }
  register(email: any, password: any, firstName: any, lastName: any, location: any): Observable<any> {
    return this.http.post<any>('/auth/api/accounts', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      location: location
    });
  }

  /**
   * Authenticates the user.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    return this.http
      .post<any>('/auth/api/auth/login', {
        userName: context.username,
        password: context.password
      })
      .pipe(
        map(d => {
          console.log(d);
          const data = {
            username: context.username,
            token: d.auth_token
          };
          this.setCredentials(data, context.remember);
          return data;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    if (!localStorage || !sessionStorage) {
      return;
    }

    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
