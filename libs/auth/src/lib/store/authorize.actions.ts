import { Action } from '@ngrx/store';

export enum AuthorizeActionTypes {
  LoadAuthorizes = '[Authorize] Load Authorizes'
}

export class LoadAuthorizes implements Action {
  readonly type = AuthorizeActionTypes.LoadAuthorizes;
}

export type AuthorizeActions = LoadAuthorizes;
