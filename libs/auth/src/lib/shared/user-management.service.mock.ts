/* eslint-disable @typescript-eslint/no-unused-vars */
import { signal, Signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { IRegisterSuccessResponse } from "../models/auth.models";
import { UserPasswordReset, UserRegistration } from "./user.management.interface";

export class MockUserManagementService {
    readonly loginUrl: Signal<string> = signal("/user/login").asReadonly();

    register(_model: UserRegistration): Observable<IRegisterSuccessResponse> {
        const mockSuccessResponse: IRegisterSuccessResponse = {
            statusCode: 200,
            message: "Mock registration successful execution",
        };
        return of(mockSuccessResponse);
    }

    resetPassword(_model: UserPasswordReset): Observable<IRegisterSuccessResponse> {
        const mockSuccessResponse: IRegisterSuccessResponse = {
            statusCode: 200,
            message: "Mock password update successful execution",
        };
        return of(mockSuccessResponse);
    }
}
