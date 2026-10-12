import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AuthenticationService } from "./authentication.service";
import * as AuthSelectors from "../selectors/auth.selectors";
import { Logger } from "@lib/core/logger";

export const authenticationGuard: CanActivateFn = (): boolean => {
    const authService = inject(AuthenticationService);
    const store = inject(Store);
    const router = inject(Router);
    const log = inject(Logger).forContext("authenticationGuard");

    const isStoreAuthenticated = store.selectSignal(AuthSelectors.selectUserStateLoggedIn)();
    const isApiAuthenticated = authService.authenticated();

    if (isStoreAuthenticated || isApiAuthenticated) {
        return true;
    }

    log.debug("User is not authenticated, triggering redirection to login layout...");

    router.navigate(["/user/login"]);
    return false;
};
