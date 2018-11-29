import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';

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
    private _credentials: Credentials;
    register(email: any, password: any, firstName: any, lastName: any, location: any): any {
        throw new Error('Method not implemented.');
    }

    /**
     * Authenticates the user.
     */
    login(context: LoginContext): Observable<Credentials> {
        // Replace by proper authentication call
        const data = {
            username: context.username,
            token: '123456'
        };
        this.setCredentials(data, context.remember);
        return of(data);
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
        this.http
            .post<any>('/api/auth/login', {
                userName: 'test',
                password: '12345678'
            })
            .subscribe(x => {
                console.log(x);
            });

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
