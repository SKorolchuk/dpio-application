import { Injectable, inject, signal, Signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { jwtDecode } from "jwt-decode";

import { ILogin } from "./credentials.interface";
import { ConfigurationService } from "@lib/shared";
import { Api } from "./api.model";
import { IAuthenticateSuccessResponse } from "../models/auth.models";

export interface Credentials {
    readonly username: string;
    readonly token: string;
    readonly password?: string;
}

const CREDENTIALS_KEY = "credentials";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    private readonly http = inject(HttpClient);
    private readonly configuration = inject(ConfigurationService);

    readonly authSuccessUrl = "/home";
    readonly authFailureUrl = "/user/login";
    readonly logoutUrl = "/";

    private _expiresAt?: number;
    private _id?: string;
    private _encodedToken?: unknown;

    private readonly credentialsSignal = signal<Credentials | null>(this.loadPersistedCredentials());

    readonly credentials = this.credentialsSignal.asReadonly();
    readonly authenticated: Signal<boolean> = computed(() => this.credentialsSignal() !== null);

    register(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        location: string,
    ): Observable<unknown> {
        return this.http.post<unknown>(this.configuration.authEndpoint(), {
            email,
            password,
            firstName,
            lastName,
            location,
        });
    }

    ping(): Observable<unknown> {
        const activeToken = this.credentialsSignal()?.token;
        return this.http.get<unknown>(this.configuration.authEndpoint(), {
            headers: {
                Authorization: `Bearer ${activeToken || ""}`,
            },
        });
    }

    relogin(): Observable<IAuthenticateSuccessResponse> {
        const currentSession = this.credentialsSignal();
        return this.http
            .post<IAuthenticateSuccessResponse>(Api.Login(this.configuration.authEndpoint()), {
                userName: currentSession?.username || "",
                password: currentSession?.password || "",
            })
            .pipe(
                map((response: IAuthenticateSuccessResponse) => {
                    const updatedData: Credentials = {
                        username: currentSession?.username || "",
                        token: response.auth_token,
                        password: currentSession?.password,
                    };
                    this.setCredentials(updatedData, true);
                    this._expiresAt = response.expires_in;
                    this._id = response.id;
                    this._encodedToken = jwtDecode(response.auth_token);
                    return response;
                }),
            );
    }

    login(context: ILogin): Observable<IAuthenticateSuccessResponse> {
        return this.http
            .post<IAuthenticateSuccessResponse>(Api.Login(this.configuration.authEndpoint()), {
                userName: context.email,
                password: context.password,
            })
            .pipe(
                map((response: IAuthenticateSuccessResponse) => {
                    const sessionData: Credentials = {
                        username: context.email,
                        token: response.auth_token,
                        password: context.password,
                    };
                    this.setCredentials(sessionData, context.remember);
                    this._expiresAt = response.expires_in;
                    this._id = response.id;
                    this._encodedToken = jwtDecode(response.auth_token);
                    return response;
                }),
            );
    }

    logout(): Observable<boolean> {
        this.setCredentials(null);
        return of(true);
    }

    private setCredentials(credentials: Credentials | null, remember?: boolean): void {
        if (typeof window === "undefined" || !window.localStorage || !window.sessionStorage) {
            return;
        }

        this.credentialsSignal.set(credentials);

        if (credentials) {
            const storage = remember ? window.localStorage : window.sessionStorage;
            storage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
        } else {
            window.sessionStorage.removeItem(CREDENTIALS_KEY);
            window.localStorage.removeItem(CREDENTIALS_KEY);
        }
    }

    private loadPersistedCredentials(): Credentials | null {
        if (typeof window === "undefined" || !window.localStorage || !window.sessionStorage) {
            return null;
        }
        const sessionToken = window.sessionStorage.getItem(CREDENTIALS_KEY);
        const localToken = window.localStorage.getItem(CREDENTIALS_KEY);

        try {
            return JSON.parse(sessionToken || localToken || "null");
        } catch {
            return null;
        }
    }
}
