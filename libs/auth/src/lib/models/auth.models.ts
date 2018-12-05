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

export type IAuthenticateResponse = IAuthenticateErrorResponse | IAuthenticateSuccessResponse;
