export interface IAuthenticateSuccessResponse {
    readonly id: string;
    readonly auth_token: string;
    readonly expires_in: number;
}

export interface IUser {
    readonly id: string;
    readonly email: string;
    readonly username?: string;
}

export interface IAuthenticateErrorResponse {
    readonly statusCode: number;
    readonly message: string;
    readonly login_failure: string;
    readonly password?: readonly string[];
    readonly userName?: readonly string[];
}

export interface IRegisterErrorResponse {
    readonly statusCode: number;
    readonly message: string;
}

export interface IResetPasswordErrorResponse {
    readonly statusCode: number;
    readonly message: string;
}

export interface IRegisterSuccessResponse {
    readonly statusCode: number;
    readonly message: string;
}

export type IRegisterResponse = IRegisterErrorResponse | IRegisterSuccessResponse;
export type IAuthenticateResponse = IAuthenticateErrorResponse | IAuthenticateSuccessResponse;
