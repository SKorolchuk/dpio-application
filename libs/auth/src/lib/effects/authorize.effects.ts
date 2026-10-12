import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, EMPTY, Observable } from "rxjs";
import { tap, exhaustMap, map, catchError } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import * as AuthActions from "../actions/authorize.actions";
import { LogOutPromptComponent } from "../log-out-prompt/log-out-prompt.component";
import { AuthenticationService } from "../shared/authentication.service";
import { IUser } from "../models/auth.models";
import { Logger } from "@lib/core";

interface PingResponse {
    readonly identity?: {
        readonly id: string;
        readonly email?: string;
    };
}

@Injectable({
    providedIn: "root",
})
export class AuthorizeEffects {
    private readonly actions$ = inject(Actions);
    private readonly authService = inject(AuthenticationService);
    private readonly router = inject(Router);
    private readonly dialogService = inject(MatDialog);

    private readonly log = inject(Logger).forContext("AuthorizeEffects");

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ payload }) =>
                this.authService.login(payload).pipe(
                    map((authResult) => {
                        if (authResult && authResult.auth_token) {
                            const mappedUser: IUser = { id: authResult.id || "", email: payload.email };
                            return AuthActions.loginSuccess({ user: mappedUser });
                        }
                        return AuthActions.loginFailure({ error: "Invalid credential tokens payload response" });
                    }),
                    catchError((error: Error) =>
                        of(AuthActions.loginFailure({ error: error.message || String(error) })),
                    ),
                ),
            ),
        ),
    );

    loginComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginComplete),
            exhaustMap(() =>
                this.authService.relogin().pipe(
                    map((authResult) => {
                        if (authResult && authResult.auth_token) {
                            const mappedUser: IUser = { id: authResult.id || "", email: "" };
                            return AuthActions.loginSuccess({ user: mappedUser });
                        }
                        return AuthActions.loginFailure({ error: "Relogin failed metadata evaluation" });
                    }),
                    catchError((error: Error) =>
                        of(AuthActions.loginFailure({ error: error.message || String(error) })),
                    ),
                ),
            ),
        ),
    );

    loginRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => {
                    this.log.debug("successfully logged in");
                    this.router.navigate([this.authService.authSuccessUrl]);
                }),
            ),
        { dispatch: false },
    );

    loginErrorRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    this.log.error("Authentication crash reported:", error);
                    this.router.navigate([this.authService.authFailureUrl]);
                }),
            ),
        { dispatch: false },
    );

    checkLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.checkLogin),
            exhaustMap(() => {
                if (this.authService.authenticated()) {
                    return (this.authService.ping() as Observable<PingResponse>).pipe(
                        map((authResult) => {
                            if (authResult && authResult.identity) {
                                const mappedUser: IUser = {
                                    id: authResult.identity.id || "",
                                    email: authResult.identity.email || "",
                                };
                                return AuthActions.loginSuccess({ user: mappedUser });
                            }
                            return AuthActions.loginFailure({ error: "Ping check validation identity missing" });
                        }),
                        catchError((error: Error) => {
                            this.router.navigate([this.authService.authFailureUrl]);
                            return of(
                                AuthActions.loginFailure({ error: error.message || String(error) }),
                                AuthActions.logoutConfirmed(),
                            );
                        }),
                    );
                } else {
                    return EMPTY;
                }
            }),
        ),
    );

    logoutConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            exhaustMap(() =>
                this.dialogService
                    .open(LogOutPromptComponent)
                    .afterClosed()
                    .pipe(
                        map((confirmed) => {
                            if (confirmed) {
                                return AuthActions.logoutConfirmed();
                            } else {
                                return AuthActions.logoutCancelled();
                            }
                        }),
                    ),
            ),
        ),
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logoutConfirmed),
                tap(() => {
                    this.authService.logout();
                }),
            ),
        { dispatch: false },
    );
}
