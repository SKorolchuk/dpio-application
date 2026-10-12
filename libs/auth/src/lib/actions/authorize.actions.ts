import { createAction, props } from "@ngrx/store";
import { ILogin } from "../shared/credentials.interface";
import {
    IUser,
    IAuthenticateErrorResponse,
    IRegisterErrorResponse,
    IResetPasswordErrorResponse,
} from "../models/auth.models";

// Login Workflow Actions
export const login = createAction("[Login Page] Login", props<{ readonly payload: ILogin }>());
export const loginComplete = createAction("[Login Page] Login Complete");
export const loginSuccess = createAction("[Auth API] Login Success", props<{ readonly user: IUser }>());
export const loginFailure = createAction(
    "[Auth API] Login Failure",
    props<{ readonly error: IAuthenticateErrorResponse | string }>(),
);

// Session Lifecycle Actions
export const checkLogin = createAction("[Auth] Check Login");
export const logout = createAction("[Auth] Confirm Logout");
export const logoutCancelled = createAction("[Auth] Logout Cancelled");
export const logoutConfirmed = createAction("[Auth] Logout Confirmed");

// Registration Workflow Actions
export const register = createAction(
    "[Register Page] Register",
    props<{ readonly payload: unknown }>(), // Replace unknown with your registration model if present
);
export const registerComplete = createAction("[Register Page] Register Complete");
export const registerSuccess = createAction("[Auth API] Register Success");
export const registerFailure = createAction(
    "[Auth API] Register Failure",
    props<{ readonly error: IRegisterErrorResponse | string }>(),
);

// Reset Password Workflow Actions
export const resetPassword = createAction(
    "[ResetPassword Page] ResetPassword",
    props<{ readonly payload: unknown }>(), // Replace unknown with your password payload model if present
);
export const resetPasswordComplete = createAction("[ResetPassword Page] ResetPassword Complete");
export const resetPasswordSuccess = createAction("[Auth API] ResetPassword Success");
export const resetPasswordFailure = createAction(
    "[Auth API] ResetPassword Failure",
    props<{ readonly error: IResetPasswordErrorResponse | string }>(),
);
