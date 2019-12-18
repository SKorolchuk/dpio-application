import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, EMPTY } from "rxjs";
import * as fromAuth from "../actions/authorize.actions";
import { MatDialog } from "@angular/material";
import { tap, exhaustMap, map, catchError } from "rxjs/operators";
import { LogOutPromptComponent } from "../log-out-prompt/log-out-prompt.component";
import { Logger } from "@dpio-application/core/src/lib/logger.service";
import { AuthenticationService } from "../shared/authentication.service";

const log = new Logger("AuthenticationGuard");

@Injectable()
export class AuthorizeEffects {
    @Effect()
    login$ = this.actions$.pipe(
        ofType<fromAuth.Login>(fromAuth.AuthActionTypes.Login),
        exhaustMap(loginAction => {
            return this.authService.login(loginAction.payload).pipe(
                map((authResult: any) => {
                    if (authResult && authResult.auth_token) {
                        return new fromAuth.LoginSuccess();
                    }
                }),
                catchError(error => of(new fromAuth.LoginFailure(error)))
            );
        })
    );

    @Effect()
    loginComplete$ = this.actions$.pipe(
        ofType<fromAuth.LoginComplete>(fromAuth.AuthActionTypes.LoginComplete),
        exhaustMap(() => {
            return this.authService.relogin().pipe(
                map((authResult: any) => {
                    if (authResult && authResult.auth_token) {
                        return new fromAuth.LoginSuccess();
                    }
                }),
                catchError(error => of(new fromAuth.LoginFailure(error)))
            );
        })
    );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType<fromAuth.LoginSuccess>(fromAuth.AuthActionTypes.LoginSuccess),
        tap(() => {
            log.debug(`successfully logged in`);
            this.router.navigate([this.authService.authSuccessUrl]);
        })
    );

    @Effect({ dispatch: false })
    loginErrorRedirect$ = this.actions$.pipe(
        ofType<fromAuth.LoginFailure>(fromAuth.AuthActionTypes.LoginFailure),
        map(action => action.payload),
        tap((err: any) => {
            if (err.error_description) {
                log.error(`Error: ${err.error_description}`);
            } else {
                log.error(`Error: ${JSON.stringify(err)}`);
            }
            this.router.navigate([this.authService.authFailureUrl]);
        })
    );

    @Effect()
    checkLogin$ = this.actions$.pipe(
        ofType<fromAuth.CheckLogin>(fromAuth.AuthActionTypes.CheckLogin),
        exhaustMap(() => {
            if (this.authService.authenticated) {
                return this.authService.ping().pipe(
                    map((authResult: any) => {
                        if (authResult && authResult.identity) {
                            return new fromAuth.LoginSuccess();
                        }
                    }),
                    catchError(error => {
                        this.authService.logout();
                        this.router.navigate([this.authService.authFailureUrl]);
                        return of(new fromAuth.LoginFailure({ error }));
                    })
                );
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    logoutConfirmation$ = this.actions$.pipe(
        ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout),
        exhaustMap(() =>
            this.dialogService
                .open(LogOutPromptComponent)
                .afterClosed()
                .pipe(
                    map(confirmed => {
                        if (confirmed) {
                            return new fromAuth.LogoutConfirmed();
                        } else {
                            return new fromAuth.LogoutCancelled();
                        }
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<fromAuth.LogoutConfirmed>(
            fromAuth.AuthActionTypes.LogoutConfirmed
        ),
        tap(() => this.authService.logout())
    );

    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router,
        private dialogService: MatDialog
    ) {}
}
