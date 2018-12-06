import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/authorize.state';

export const selectAuthState = createFeatureSelector<fromAuth.State>('authorize');

export const selectUserState = createSelector(selectAuthState, (state: fromAuth.State) => state.status);

export const selectUserStateLoggedIn = createSelector(selectUserState, (state: fromAuth.UserState) => state.loggedIn);
export const selectUserStateUser = createSelector(selectUserState, (state: fromAuth.UserState) => state.user);

export const selectLoginPageState = createSelector(selectAuthState, (state: fromAuth.State) => state.loginPage);

export const selectLoginPageError = createSelector(
  selectLoginPageState,
  (state: fromAuth.LoginPageState) => state.error
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  (state: fromAuth.LoginPageState) => state.pending
);