import { Injectable, inject, signal, Signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ConfigurationService } from "@lib/shared";
import { Api } from "./api.model";
import { IRegisterSuccessResponse } from "../models/auth.models";
import { UserPasswordReset, UserRegistration } from "./user.management.interface";

@Injectable({
    providedIn: "root",
})
export class UserManagementService {
    private readonly http = inject(HttpClient);
    private readonly configuration = inject(ConfigurationService);

    readonly loginUrl: Signal<string> = signal("/user/login").asReadonly();

    register(model: UserRegistration): Observable<IRegisterSuccessResponse> {
        return this.http
            .post<IRegisterSuccessResponse>(Api.Register(this.configuration.authEndpoint()), model)
            .pipe(map((response: IRegisterSuccessResponse) => response));
    }

    resetPassword(model: UserPasswordReset): Observable<IRegisterSuccessResponse> {
        return this.http
            .post<IRegisterSuccessResponse>(Api.ResetPassword(this.configuration.authEndpoint()), model)
            .pipe(map((response: IRegisterSuccessResponse) => response));
    }
}
