import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuth from '../actions/authorize.actions';
import { MatDialog } from '@angular/material';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';
import { Logger } from '@dpio-application/core/src/lib/logger.service';
import { of } from 'rxjs';
import { UserManagementService } from '../shared/user-management.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class UserManagementEffects {
  @Effect()
  register$ = this.actions$.pipe(
    ofType<fromAuth.Register>(fromAuth.RegisterActionTypes.Register),
    exhaustMap(registerAction => {
      return this.userService.register(registerAction.payload).pipe(
        map((registerResult: any) => {
          if (registerResult) {
            return new fromAuth.RegisterSuccess(registerResult);
          }
        }),
        catchError(error => of(new fromAuth.RegisterFailure(error)))
      );
    })
  );

  @Effect()
  registerRedirect$ = this.actions$.pipe(
    ofType<fromAuth.RegisterSuccess>(fromAuth.RegisterActionTypes.RegisterSuccess),
    exhaustMap(registerSuccessAction => {
      log.debug(`successfully registered`);
      this.router.navigate([this.userService.loginUrl]);
      return of(new fromAuth.RegisterComplete(registerSuccessAction.payload));
    })
  );

  @Effect({ dispatch: false })
  registerErrorRedirect$ = this.actions$.pipe(
    ofType<fromAuth.RegisterFailure>(fromAuth.RegisterActionTypes.RegisterFailure),
    map(action => action.payload),
    tap((err: any) => {
      if (err.error_description) {
        log.error(`Error: ${err.error_description}`);
      } else {
        log.error(`Error: ${JSON.stringify(err)}`);
      }
    })
  );

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType<fromAuth.ResetPassword>(fromAuth.ResetPasswordActionTypes.ResetPassword),
    exhaustMap(resetPasswordAction => {
      return this.userService.resetPassword(resetPasswordAction.payload).pipe(
        map((resetPasswordResult: any) => {
          if (resetPasswordResult) {
            return new fromAuth.ResetPasswordSuccess(resetPasswordResult);
          }
        }),
        catchError(error => of(new fromAuth.ResetPasswordFailure(error)))
      );
    })
  );

  @Effect()
  resetPasswordRedirect$ = this.actions$.pipe(
    ofType<fromAuth.ResetPasswordSuccess>(fromAuth.ResetPasswordActionTypes.ResetPasswordSuccess),
    exhaustMap(resetPasswordSuccessAction => {
      log.debug(`successfully reset password`);
      this.router.navigate([this.userService.loginUrl]);
      return of(new fromAuth.ResetPasswordComplete(resetPasswordSuccessAction.payload));
    })
  );

  @Effect({ dispatch: false })
  resetPasswordErrorRedirect$ = this.actions$.pipe(
    ofType<fromAuth.ResetPasswordFailure>(fromAuth.ResetPasswordActionTypes.ResetPasswordFailure),
    map(action => action.payload),
    tap((err: any) => {
      if (err.error_description) {
        log.error(`Error: ${err.error_description}`);
      } else {
        log.error(`Error: ${JSON.stringify(err)}`);
      }
    })
  );

  constructor(private actions$: Actions, private userService: UserManagementService, private router: Router) {}
}
