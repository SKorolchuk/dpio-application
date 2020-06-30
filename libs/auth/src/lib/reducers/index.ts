import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./authorize.state";
import * as fromReducers from "./authorize.reducer";
import { environment } from "apps/dpio-application/src/environments/environment";

export interface AuthModulePartState {
    authorize: fromAuth.State;
}

export const reducers: ActionReducerMap<fromAuth.AuthPartState> = {
    status: fromReducers.UserStateReducer,
    loginPage: fromReducers.LoginPageReducer,
    registerPage: fromReducers.RegisterPageReducer,
    resetPasswordPage: fromReducers.ResetPasswordPageReducer,
};

export const metaReducers: MetaReducer<fromAuth.State>[] = !environment.production ? [] : [];
