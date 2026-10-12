import {
    IAuthenticateErrorResponse,
    IUser,
    IRegisterErrorResponse,
    IResetPasswordErrorResponse,
} from "../models/auth.models";

export interface LoginPageState {
    readonly error: IAuthenticateErrorResponse | string | null;
    readonly pending: boolean;
}

export interface RegisterPageState {
    readonly error: IRegisterErrorResponse | string | null;
    readonly pending: boolean;
}

export interface ResetPasswordPageState {
    readonly error: IResetPasswordErrorResponse | string | null;
    readonly pending: boolean;
}

export interface UserState {
    readonly loggedIn: boolean;
    readonly user: IUser | null;
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

export const initialUserState: UserState = {
    loggedIn: false,
    user: null,
};
