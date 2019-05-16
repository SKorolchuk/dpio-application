export interface IAuthenticateSuccessResponse {
  id: string;
  auth_token: string;
  expires_in: number;
}

export interface IUser {
  id: string;
  email: string;
}

export interface IAuthenticateErrorResponse {
  statusCode: number;
  message: string;
  login_failure: string;
  Password: Array<string>;
  UserName: Array<string>;
}

export interface IRegisterErrorResponse {
  statusCode: number;
  message: string;
}

export interface IRegisterSuccessResponse {
  statusCode: number;
  message: string;
}

export type IRegisterResponse = IRegisterErrorResponse | IRegisterSuccessResponse;

export type IAuthenticateResponse = IAuthenticateErrorResponse | IAuthenticateSuccessResponse;
