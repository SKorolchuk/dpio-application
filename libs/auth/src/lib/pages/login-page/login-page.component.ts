import { Component, OnInit } from "@angular/core";
import { Logger } from "@dpio-application/core/src/lib/logger.service";
import { Router } from "@angular/router";
import * as fromStore from "../../reducers";
import { I18nService } from "@dpio-application/core/src/lib/i18n.service";
import { AuthenticationService } from "@dpio-application/auth/src/lib/shared/authentication.service";
import { SettingsService } from "@dpio-application/core/src/lib/settings.service";
import { Store, select } from "@ngrx/store";
import { selectLoginPagePending, selectLoginPageError } from "../../selectors/auth.selectors";
import { ILogin } from "../../shared/credentials.interface";

import * as fromActions from "../../actions/authorize.actions";

const log = new Logger("Login");

@Component({
    selector: "dpio-application-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
    pending$ = this.store.pipe(select(selectLoginPagePending));
    error$ = this.store.pipe(select(selectLoginPageError));
    version: string;

    constructor(
        private store: Store<fromStore.AuthModulePartState>,
        private router: Router,
        private i18nService: I18nService,
        private authenticationService: AuthenticationService,
        settingsService: SettingsService,
    ) {
        this.version = settingsService.version;
    }

    ngOnInit() {}

    public onSubmit($event: ILogin) {
        this.store.dispatch(new fromActions.Login($event));
    }

    public setLanguage(language: string) {
        this.i18nService.language = language;
    }

    public goToSignUp(): void {
        this.router.navigate(["/user/register"], { replaceUrl: true });
    }

    public goToReset(): void {
        this.router.navigate(["/user/reset"], { replaceUrl: true });
    }

    public get currentLanguage(): string {
        return this.i18nService.language;
    }

    public get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }
}
