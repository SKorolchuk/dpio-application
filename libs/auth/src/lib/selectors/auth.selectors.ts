import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "../reducers/authorize.state";
import { AuthModulePartState } from "../reducers/index";

export const selectAuthState = createFeatureSelector<AuthModulePartState>("authorize");

export const selectUserState = createSelector(selectAuthState, (state: AuthModulePartState) => state?.status);

export const selectUserStateLoggedIn = createSelector(
    selectUserState,
    (state: fromAuth.UserState) => state?.loggedIn ?? false,
);

export const selectUserStateUser = createSelector(selectUserState, (state: fromAuth.UserState) => state?.user ?? null);

export const selectLoginPageState = createSelector(selectAuthState, (state: AuthModulePartState) => state?.loginPage);

export const selectRegisterPageState = createSelector(
    selectAuthState,
    (state: AuthModulePartState) => state?.registerPage,
);

export const selectResetPasswordPageState = createSelector(
    selectAuthState,
    (state: AuthModulePartState) => state?.resetPasswordPage,
);

export const selectResetPasswordPageError = createSelector(
    selectResetPasswordPageState,
    (state: fromAuth.ResetPasswordPageState) => state?.error ?? null,
);

export const selectResetPasswordPagePending = createSelector(
    selectResetPasswordPageState,
    (state: fromAuth.ResetPasswordPageState) => state?.pending ?? false,
);

export const selectRegisterPageError = createSelector(
    selectRegisterPageState,
    (state: fromAuth.RegisterPageState) => state?.error ?? null,
);

export const selectRegisterPagePending = createSelector(
    selectRegisterPageState,
    (state: fromAuth.RegisterPageState) => state?.pending ?? false,
);

export const selectLoginPageError = createSelector(
    selectLoginPageState,
    (state: fromAuth.LoginPageState) => state?.error ?? null,
);

export const selectLoginPagePending = createSelector(
    selectLoginPageState,
    (state: fromAuth.LoginPageState) => state?.pending ?? false,
);
