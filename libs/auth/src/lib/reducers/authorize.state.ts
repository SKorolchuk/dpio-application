import { IAuthenticateErrorResponse, IUser } from '../models/auth.models';

export interface State {
  status: UserState;
  loginPage: LoginPageState;
  registerPage: RegisterPageState;
}

export interface LoginPageState {
  error: IAuthenticateErrorResponse | string | null;
  pending: boolean;
}

export interface RegisterPageState {
  error: IAuthenticateErrorResponse | string | null;
  pending: boolean;
}

export const initialRegisterPageState: LoginPageState = {
  error: null,
  pending: false
};

export const initialLoginPageState: LoginPageState = {
  error: null,
  pending: false
};

export interface UserState {
  loggedIn: boolean;
  user: IUser | null;
}

export const initialUserState: UserState = {
  loggedIn: false,
  user: null
};

export type AuthPartState = State | LoginPageState | RegisterPageState | any;
