/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { tap, exhaustMap, map, catchError } from "rxjs/operators";

import * as AuthActions from "../actions/authorize.actions";
import { UserManagementService } from "../shared/user-management.service";
import { IRegisterSuccessResponse } from "../models/auth.models";
import { Logger } from "@lib/core";
import { UserPasswordReset, UserRegistration } from "../shared/user.management.interface";

@Injectable({
    providedIn: "root",
})
export class UserManagementEffects {
    private readonly actions$ = inject(Actions);
    private readonly userService = inject(UserManagementService);
    private readonly router = inject(Router);

    private readonly log = inject(Logger).forContext("UserManagementEffects");

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            exhaustMap(({ payload }) =>
                this.userService.register(payload as UserRegistration).pipe(
                    map((_registerResult: IRegisterSuccessResponse) => AuthActions.registerSuccess()),
                    catchError((error: Error) =>
                        of(AuthActions.registerFailure({ error: error.message || String(error) })),
                    ),
                ),
            ),
        ),
    );

    registerRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.registerSuccess),
            exhaustMap(() => {
                this.log.debug("successfully registered");
                this.router.navigate([this.userService.loginUrl()]);
                return of(AuthActions.registerComplete());
            }),
        ),
    );

    registerErrorRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.registerFailure),
                tap(({ error }) => {
                    this.log.error("Registration crash reported:", error);
                }),
            ),
        { dispatch: false },
    );

    resetPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.resetPassword),
            exhaustMap(({ payload }) =>
                this.userService.resetPassword(payload as UserPasswordReset).pipe(
                    map((_resetPasswordResult: IRegisterSuccessResponse) => AuthActions.resetPasswordSuccess()),
                    catchError((error: Error) =>
                        of(AuthActions.resetPasswordFailure({ error: error.message || String(error) })),
                    ),
                ),
            ),
        ),
    );

    resetPasswordRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.resetPasswordSuccess),
            exhaustMap(() => {
                this.log.debug("successfully reset password");
                this.router.navigate([this.userService.loginUrl()]);
                return of(AuthActions.resetPasswordComplete());
            }),
        ),
    );

    resetPasswordErrorRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.resetPasswordFailure),
                tap(({ error }) => {
                    this.log.error("Reset password crash reported:", error);
                }),
            ),
        { dispatch: false },
    );
}
