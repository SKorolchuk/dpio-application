import { Action } from '@ngrx/store';
import { AuthorizeActions, AuthorizeActionTypes } from './authorize.actions';

// tslint:disable-next-line:no-empty-interface
export interface State {}

export const initialState: State = {};

// tslint:disable-next-line:typedef
export function reducer(state = initialState, action: AuthorizeActions): State {
  switch (action.type) {
    case AuthorizeActionTypes.LoadAuthorizes:
      return state;

    default:
      return state;
  }
}
