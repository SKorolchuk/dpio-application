import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { of } from "rxjs";
import { mergeMap, map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Logger } from "../../../../core/src/lib/logger.service";
import { AuthenticationService } from "./authentication.service";
import * as fromSelectors from "../selectors/auth.selectors";
import * as fromStore from "../reducers";
import { ConfigurationService } from "@dpio-application/shared/src/lib/services/configuration.service";
import * as fromAuth from "../actions/authorize.actions";

const log = new Logger("AuthenticationGuard");

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private store: Store<fromStore.AuthModulePartState>,
        private router: Router,
        private configuration: ConfigurationService
    ) {}

    canActivate() {
        return this.checkStoreAuthentication().pipe(
            mergeMap(storeAuth => {
                if (storeAuth) {
                    return of(true);
                }

                return this.checkApiAuthentication();
            }),
            map(storeOrApiAuth => {
                if (!storeOrApiAuth) {
                    log.debug("Not authenticated, redirecting...");
                    this.router.navigate(["/user/login"]);
                    return false;
                }

                return true;
            })
        );
    }

    checkStoreAuthentication() {
        return this.store
            .select(fromSelectors.selectUserStateLoggedIn)
            .pipe(take(1));
    }

    checkApiAuthentication() {
        return of(this.authenticationService.authenticated);
    }
}
