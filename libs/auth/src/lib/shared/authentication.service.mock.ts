import { signal, computed, Signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { Credentials } from "./authentication.service";
import { ILogin } from "./credentials.interface";
import { IAuthenticateSuccessResponse } from "../models/auth.models";

export class MockAuthenticationService {
    readonly credentialsSignal = signal<Credentials | null>({
        username: "test-mock-user",
        token: "mock-jwt-token-xyz-123",
        password: "safe-password-token",
    });

    readonly credentials = this.credentialsSignal.asReadonly();
    readonly authenticated: Signal<boolean> = computed(() => this.credentialsSignal() !== null);

    readonly authSuccessUrl = "/home";
    readonly authFailureUrl = "/user/login";
    readonly logoutUrl = "/";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(_context: ILogin): Observable<IAuthenticateSuccessResponse> {
        const mockSuccessResponse: IAuthenticateSuccessResponse = {
            id: "mock-user-uuid-999",
            auth_token: "mock-generated-jwt-token-123456",
            expires_in: 3600,
        };

        return of(mockSuccessResponse);
    }

    logout(): Observable<boolean> {
        this.credentialsSignal.set(null);
        return of(true);
    }
}
