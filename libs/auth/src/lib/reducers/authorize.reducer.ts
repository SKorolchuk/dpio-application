import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/authorize.actions";
import {
    initialLoginPageState,
    initialUserState,
    UserState,
    LoginPageState,
    RegisterPageState,
    initialRegisterPageState,
    ResetPasswordPageState,
    initialResetPasswordPageState,
} from "./authorize.state";

export const RegisterPageReducer = createReducer<RegisterPageState>(
    initialRegisterPageState,
    on(AuthActions.register, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AuthActions.registerSuccess, (state) => ({
        ...state,
        error: null,
        pending: false,
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
        ...state,
        error,
        pending: false,
    })),
);

export const ResetPasswordPageReducer = createReducer<ResetPasswordPageState>(
    initialResetPasswordPageState,
    on(AuthActions.resetPassword, (state) => ({
        ...state,
        error: null,
        pending: true,
    })),
    on(AuthActions.resetPasswordSuccess, (state) => ({
        ...state,
        error: null,
        pending: false,
    })),
    on(AuthActions.resetPasswordFailure, (state, { error }) => ({
        ...state,
        error,
        pending: false,
    })),
);

export const LoginPageReducer = createReducer<LoginPageState>(
    initialLoginPageState,
    on(
        AuthActions.login,
        AuthActions.loginComplete,
        AuthActions.checkLogin,
        AuthActions.logout,
        AuthActions.logoutCancelled,
        AuthActions.logoutConfirmed,
        (state) => ({
            ...state,
            error: null,
            pending: true,
        }),
    ),
    on(AuthActions.loginSuccess, (state) => ({
        ...state,
        error: null,
        pending: false,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        pending: false,
    })),
);

export const UserStateReducer = createReducer<UserState>(
    initialUserState,
    on(AuthActions.loginComplete, AuthActions.checkLogin, (state) => ({
        ...state,
        loggedIn: true,
        user: null,
    })),
    on(AuthActions.logout, () => initialUserState),
    on(AuthActions.logoutCancelled, AuthActions.logoutConfirmed, (state) => ({
        ...state,
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        loggedIn: true,
        user,
    })),
);
