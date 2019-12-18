import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "../reducers/authorize.state";

export const selectAuthState = createFeatureSelector<fromAuth.State>(
    "authorize"
);

export const selectUserState = createSelector(
    selectAuthState,
    (state: fromAuth.State) => state.status
);

export const selectUserStateLoggedIn = createSelector(
    selectUserState,
    (state: fromAuth.UserState) => state.loggedIn
);
export const selectUserStateUser = createSelector(
    selectUserState,
    (state: fromAuth.UserState) => state.user
);

export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: fromAuth.State) => state.loginPage
);

export const selectRegisterPageState = createSelector(
    selectAuthState,
    (state: fromAuth.State) => state.registerPage
);

export const selectResetPasswordPageState = createSelector(
    selectAuthState,
    (state: fromAuth.State) => state.resetPasswordPage
);

export const selectResetPasswordPageError = createSelector(
    selectResetPasswordPageState,
    (state: fromAuth.ResetPasswordPageState) => state.error
);
export const selectResetPasswordPagePending = createSelector(
    selectResetPasswordPageState,
    (state: fromAuth.ResetPasswordPageState) => state.pending
);

export const selectRegisterPageError = createSelector(
    selectRegisterPageState,
    (state: fromAuth.RegisterPageState) => state.error
);
export const selectRegisterPagePending = createSelector(
    selectRegisterPageState,
    (state: fromAuth.RegisterPageState) => state.pending
);

export const selectLoginPageError = createSelector(
    selectLoginPageState,
    (state: fromAuth.LoginPageState) => state.error
);
export const selectLoginPagePending = createSelector(
    selectLoginPageState,
    (state: fromAuth.LoginPageState) => state.pending
);
