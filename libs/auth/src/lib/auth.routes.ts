import { Routes } from "@angular/router";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { authorizeReducer } from "./reducers";
import { AuthorizeEffects } from "./effects/authorize.effects";
import { UserManagementEffects } from "./effects/user-management.effects";

export const authRoutes: Routes = [
    {
        path: "user",
        providers: [
            provideState({ name: "authorize", reducer: authorizeReducer }),
            provideEffects([AuthorizeEffects, UserManagementEffects]),
        ],
        children: [
            {
                path: "login",
                loadComponent: () =>
                    import("./pages/login-page/login-page.component").then((m) => m.LoginPageComponent),
                title: "loginPageTitle",
            },
            {
                path: "register",
                loadComponent: () =>
                    import("./pages/register-page/register-page.component").then((m) => m.RegisterPageComponent),
                title: "registerPageTitle",
            },
            {
                path: "reset",
                loadComponent: () =>
                    import("./pages/reset-password-page/reset-password-page.component").then(
                        (m) => m.ResetPasswordPageComponent,
                    ),
                title: "resetPasswordPageTitle",
            },
            {
                path: "callback",
                loadComponent: () => import("./callback/callback.component").then((m) => m.CallbackComponent),
            },
        ],
    },
];
