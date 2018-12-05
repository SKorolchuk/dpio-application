import { IAuthenticateErrorResponse, IUser } from '../models/auth.models';

export interface State {
  status: UserState;
  loginPage: LoginPageState;
}

export interface LoginPageState {
  error: IAuthenticateErrorResponse | string | null;
  pending: boolean;
}

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

export type AuthPartState = State | LoginPageState | any;
