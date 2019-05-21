import { AuthActions, AuthActionTypes, RegisterActions, ResetPasswordActions } from '../actions/authorize.actions';
import {
  initialLoginPageState,
  initialUserState,
  UserState,
  LoginPageState,
  RegisterPageState,
  initialRegisterPageState,
  ResetPasswordPageState,
  initialResetPasswordPageState
} from './authorize.state';
import { IUser } from '../models/auth.models';

export function RegisterPageReducer(
  state: RegisterPageState = initialRegisterPageState,
  action: RegisterActions
): RegisterPageState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export function ResetPasswordPageReducer(
  state: ResetPasswordPageState = initialResetPasswordPageState,
  action: ResetPasswordActions
): ResetPasswordPageState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export function LoginPageReducer(state: LoginPageState = initialLoginPageState, action: AuthActions): LoginPageState {
  switch (action.type) {
    case AuthActionTypes.LoginComplete: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthActionTypes.CheckLogin: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthActionTypes.Logout: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthActionTypes.LogoutCancelled: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthActionTypes.LogoutConfirmed: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthActionTypes.Login: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        error: null,
        pending: false
      };
    }
    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    }

    default: {
      return state;
    }
  }
}

export function UserStateReducer(state: UserState = initialUserState, action: AuthActions): UserState {
  switch (action.type) {
    case AuthActionTypes.LoginComplete: {
      return {
        ...state,
        loggedIn: true,
        user: null
      };
    }
    case AuthActionTypes.CheckLogin: {
      return {
        ...state,
        loggedIn: true,
        user: null
      };
    }
    case AuthActionTypes.Logout: {
      return initialUserState;
    }
    case AuthActionTypes.LogoutCancelled: {
      return {
        ...state
      };
    }
    case AuthActionTypes.LogoutConfirmed: {
      return {
        ...state
      };
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: {} as IUser
      };
    }
    default: {
      return state;
    }
  }
}
