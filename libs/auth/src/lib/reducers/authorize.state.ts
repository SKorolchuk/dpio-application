import {
    IAuthenticateErrorResponse,
    IUser,
    IRegisterErrorResponse,
    IResetPasswordErrorResponse,
} from "../models/auth.models";

export interface State {
    status: UserState;
    loginPage: LoginPageState;
    registerPage: RegisterPageState;
    resetPasswordPage: ResetPasswordPageState;
}

export interface LoginPageState {
    error: IAuthenticateErrorResponse | string | null;
    pending: boolean;
}

export interface RegisterPageState {
    error: IRegisterErrorResponse | string | null;
    pending: boolean;
}

export interface ResetPasswordPageState {
    error: IResetPasswordErrorResponse | string | null;
    pending: boolean;
}

export const initialResetPasswordPageState: ResetPasswordPageState = {
    error: null,
    pending: false,
};

export const initialRegisterPageState: RegisterPageState = {
    error: null,
    pending: false,
};

export const initialLoginPageState: LoginPageState = {
    error: null,
    pending: false,
};

export interface UserState {
    loggedIn: boolean;
    user: IUser | null;
}

export const initialUserState: UserState = {
    loggedIn: false,
    user: null,
};

export type AuthPartState =
    | State
    | LoginPageState
    | RegisterPageState
    | ResetPasswordPageState
    | any;
