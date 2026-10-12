import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from "@angular/router";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import { environment } from "../environments/environment";
import { AuthorizeEffects, reducers, UserManagementEffects } from "@lib/auth";
import { ENV_CONFIG_TOKEN } from "@lib/shared";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes, withComponentInputBinding(), withEnabledBlockingInitialNavigation()),
        provideStore(reducers),
        provideEffects([AuthorizeEffects, UserManagementEffects]),

        // Configures safe Store Devtools integration for browser state inspection
        provideStoreDevtools({
            name: "Auth0 Book Library",
            maxAge: 25,
            logOnly: environment.production,
            connectInZone: false, // Mandatory flag for standalone Zoneless applications
        }),
        { provide: ENV_CONFIG_TOKEN, useValue: environment },
    ],
};
