import { Action } from '@ngrx/store';
import { ILogin } from '../shared/credentials.interface';

export enum AuthActionTypes {
  Login = '[Login Page] Login',
  LoginComplete = '[Login Page] Login Complete',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
  CheckLogin = '[Auth] Check Login',
  Logout = '[Auth] Confirm Logout',
  LogoutCancelled = '[Auth] Logout Cancelled',
  LogoutConfirmed = '[Auth] Logout Confirmed'
}

export enum RegisterActionTypes {
  Register = '[Register Page] Register',
  RegisterComplete = '[Register Page] Register Complete',
  RegisterSuccess = '[Auth API] Register Success',
  RegisterFailure = '[Auth API] Register Failure'
}

export class Register implements Action {
  readonly type = RegisterActionTypes.Register;

  constructor(public payload: any) {}
}
export class RegisterComplete implements Action {
  readonly type = RegisterActionTypes.RegisterComplete;

  constructor(public payload: any) {}
}
export class RegisterSuccess implements Action {
  readonly type = RegisterActionTypes.RegisterSuccess;

  constructor(public payload: any) {}
}
export class RegisterFailure implements Action {
  readonly type = RegisterActionTypes.RegisterFailure;

  constructor(public payload: any) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: ILogin) {}
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LoginComplete;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class CheckLogin implements Action {
  readonly type = AuthActionTypes.CheckLogin;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutConfirmed implements Action {
  readonly type = AuthActionTypes.LogoutConfirmed;
}

export class LogoutCancelled implements Action {
  readonly type = AuthActionTypes.LogoutCancelled;
}

export type AuthActions =
  | Login
  | LoginComplete
  | LoginSuccess
  | LoginFailure
  | CheckLogin
  | Logout
  | LogoutCancelled
  | LogoutConfirmed;

export type RegisterActions = Register | RegisterComplete | RegisterSuccess | RegisterFailure;
