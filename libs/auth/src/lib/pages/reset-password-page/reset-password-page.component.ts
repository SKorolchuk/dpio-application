import { Component, OnInit, inject, computed, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

import { I18nService, SettingsService, Logger } from "@lib/core";
import { ResetPasswordComponent } from "../../reset-password/reset-password.component";
import { LangSelectorComponent } from "@lib/core";
import * as AuthActions from "../../actions/authorize.actions";
import * as AuthSelectors from "../../selectors/auth.selectors";
import { UserPasswordReset } from "../../shared/user.management.interface";

@Component({
    selector: "app-reset-password-page",
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, ResetPasswordComponent, LangSelectorComponent],
    templateUrl: "./reset-password-page.component.html",
    styleUrls: ["./reset-password-page.component.scss"],
})
export class ResetPasswordPageComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly i18nService = inject(I18nService);
    private readonly settingsService = inject(SettingsService);

    private readonly log = inject(Logger).forContext("ResetPasswordPageComponent");

    readonly pending = this.store.selectSignal(AuthSelectors.selectResetPasswordPagePending);
    readonly error = this.store.selectSignal(AuthSelectors.selectResetPasswordPageError);

    readonly version: Signal<string> = computed(() => this.settingsService.version());
    readonly currentLanguage: Signal<string> = computed(() => this.i18nService.currentLanguage());
    readonly languages: Signal<readonly string[]> = computed(() => this.i18nService.supportedLanguages());

    ngOnInit(): void {
        this.log.debug("Reset password presentation container workspace initialized.");
    }

    goToLogin(): void {
        this.router.navigate(["/"], { replaceUrl: true });
    }

    onSubmit(event: UserPasswordReset): void {
        this.store.dispatch(AuthActions.resetPassword({ payload: event }));
    }

    setLanguage(language: string): void {
        this.i18nService.setLanguage(language);
    }
}
