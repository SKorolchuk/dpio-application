import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthorizeActionTypes } from './authorize.actions';

@Injectable()
export class AuthorizeEffects {

  @Effect()
  loadAuthorizes$ = this.actions$.pipe(ofType(AuthorizeActionTypes.LoadAuthorizes));

  constructor(private actions$: Actions) {}
}
