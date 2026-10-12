import { Component, OnInit, inject, computed, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

import { I18nService, SettingsService } from "@lib/core";
import { Logger } from "@lib/core/logger";
import { LoginComponent } from "../../login/login.component";
import { LangSelectorComponent } from "@lib/core";
import { ILogin } from "../../shared/credentials.interface";
import * as AuthActions from "../../actions/authorize.actions";
import * as AuthSelectors from "../../selectors/auth.selectors";

@Component({
    selector: "app-login-page",
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, LoginComponent, LangSelectorComponent],
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly i18nService = inject(I18nService);
    private readonly settingsService = inject(SettingsService);
    private readonly log = inject(Logger).forContext("LoginPageComponent");

    readonly pending = this.store.selectSignal(AuthSelectors.selectLoginPagePending);
    readonly error = this.store.selectSignal(AuthSelectors.selectLoginPageError);

    readonly version: Signal<string> = computed(() => this.settingsService.version());
    readonly currentLanguage: Signal<string> = computed(() => this.i18nService.currentLanguage());
    readonly languages: Signal<readonly string[]> = computed(() => this.i18nService.supportedLanguages());

    ngOnInit(): void {
        this.log.debug("Login presentation container workspace initialized.");
    }

    onSubmit(credentials: ILogin): void {
        this.store.dispatch(AuthActions.login({ payload: credentials }));
    }

    setLanguage(language: string): void {
        this.i18nService.setLanguage(language);
    }

    goToSignUp(): void {
        this.router.navigate(["/user/register"], { replaceUrl: true });
    }

    goToReset(): void {
        this.router.navigate(["/user/reset"], { replaceUrl: true });
    }
}
