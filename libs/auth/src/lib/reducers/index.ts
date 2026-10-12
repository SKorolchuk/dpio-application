import { ActionReducerMap, createFeatureSelector, createSelector, combineReducers, Action } from "@ngrx/store";
import * as fromAuth from "./authorize.state";
import * as fromReducers from "./authorize.reducer";

export interface AuthModulePartState {
    readonly status: fromAuth.UserState;
    readonly loginPage: fromAuth.LoginPageState;
    readonly registerPage: fromAuth.RegisterPageState;
    readonly resetPasswordPage: fromAuth.ResetPasswordPageState;
}

export const reducers: ActionReducerMap<AuthModulePartState> = {
    status: fromReducers.UserStateReducer,
    loginPage: fromReducers.LoginPageReducer,
    registerPage: fromReducers.RegisterPageReducer,
    resetPasswordPage: fromReducers.ResetPasswordPageReducer,
};

export function authorizeReducer(state: AuthModulePartState | undefined, action: Action): AuthModulePartState {
    return combineReducers(reducers)(state, action);
}

export const selectAuthorizeFeature = createFeatureSelector<AuthModulePartState>("authorize");

export const selectAuthStatusState = createSelector(
    selectAuthorizeFeature,
    (state: AuthModulePartState) => state.status,
);
