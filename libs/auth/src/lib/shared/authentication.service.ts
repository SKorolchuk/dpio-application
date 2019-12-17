import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ILogin } from "./credentials.interface";
import { ConfigurationService } from "@dpio-application/shared/src/lib/services/configuration.service";
import { Api } from "apps/dpio-application/src/environments/api.model";

export interface Credentials {
    // Customize received credentials here
    username: string;
    token: string;
    password: string;
}

const credentialsKey = "credentials";
const helper = new JwtHelperService();

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    private _onAuthSuccessUrl = "/home";
    private _onAuthFailureUrl = "/user/login";
    private _logoutUrl = "/";
    private _expiresAt: number;
    private _credentials: Credentials;
    private _id: string;
    private _encodedToken: any;

    constructor(
        private http: HttpClient,
        private configuration: ConfigurationService
    ) {
        this._credentials = JSON.parse(
            sessionStorage.getItem(credentialsKey) ||
                localStorage.getItem(credentialsKey)
        );
    }

    /**
     * Gets the user credentials.
     */
    get credentials(): Credentials {
        return this._credentials;
    }

    register(
        email: any,
        password: any,
        firstName: any,
        lastName: any,
        location: any
    ): Observable<any> {
        return this.http.post<any>(
            Api.Register(this.configuration.authEndpoint),
            {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                location: location,
            }
        );
    }

    get authSuccessUrl(): string {
        return this._onAuthSuccessUrl;
    }

    get authFailureUrl(): string {
        return this._onAuthFailureUrl;
    }

    get authenticated(): boolean {
        return !!JSON.parse(localStorage.getItem(credentialsKey));
    }

    ping(): Observable<any> {
        return this.http.get<any>(Api.Ping(this.configuration.authEndpoint), {
            headers: {
                Authorization: `Bearer ${this._credentials.token}`,
            },
        });
    }

    relogin(): Observable<Credentials> {
        // Replace by proper authentication call
        return this.http
            .post<any>(Api.Login(this.configuration.authEndpoint), {
                userName: this.credentials.username,
                password: this.credentials.password,
            })
            .pipe(
                map(response => {
                    console.log(response);
                    const data = {
                        ...this.credentials,
                        username: this.credentials.username,
                        token: response.auth_token,
                    };
                    this.setCredentials(data, true);
                    this._expiresAt = response.expires_in;
                    this._id = response.id;
                    this._encodedToken = helper.decodeToken(
                        response.auth_token
                    );
                    return response;
                })
            );
    }

    login(context: ILogin): Observable<Credentials> {
        // Replace by proper authentication call
        return this.http
            .post<any>(Api.Login(this.configuration.authEndpoint), {
                userName: context.email,
                password: context.password,
            })
            .pipe(
                map(response => {
                    console.log(response);
                    const data = {
                        username: context.email,
                        token: response.auth_token,
                        password: context.password,
                    };
                    this.setCredentials(data, context.remember);
                    this._expiresAt = response.expires_in;
                    this._id = response.id;
                    this._encodedToken = helper.decodeToken(
                        response.auth_token
                    );
                    return response;
                })
            );
    }

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
