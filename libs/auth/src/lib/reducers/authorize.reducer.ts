import { AuthActions, AuthActionTypes } from '../actions/authorize.actions';

export interface State {
  isLoggedIn: boolean;
}

export const initialState: State = {
  isLoggedIn: false
};

export function reducer(state: State = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return { ...state, isLoggedIn: true };

    case AuthActionTypes.LogoutConfirmed:
      return initialState; // the initial state has isLoggedIn set to false

    default:
      return state;
  }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
