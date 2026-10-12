import { Injectable, inject, signal, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigurationService } from "@lib/shared";
import { Logger } from "./logger.service";

const LANGUAGE_KEY = "language";

@Injectable({
    providedIn: "root",
})
export class I18nService {
    private readonly configuration = inject(ConfigurationService);
    private readonly router = inject(Router);
    private readonly log = inject(Logger).forContext("I18nService");

    readonly defaultLanguage: Signal<string> = this.configuration.defaultLanguage;
    readonly supportedLanguages: Signal<readonly string[]> = this.configuration.supportedLanguages;

    private readonly currentLanguageSignal = signal<string>(this.defaultLanguage());
    readonly currentLanguage = this.currentLanguageSignal.asReadonly();

    init(): void {
        if (typeof window === "undefined" || !window.localStorage) {
            return;
        }

        const cachedLang = window.localStorage.getItem(LANGUAGE_KEY);
        this.setLanguage(cachedLang || this.getBrowserLanguage());
    }

    setLanguage(language: string | null): void {
        if (typeof window === "undefined" || !window.localStorage) {
            return;
        }

        let targetLang = language || window.localStorage.getItem(LANGUAGE_KEY) || this.getBrowserLanguage();
        let isSupported = this.supportedLanguages().includes(targetLang);

        if (targetLang && !isSupported) {
            const baseCode = targetLang.split("-");
            const matched = this.supportedLanguages().find((lang) => lang.startsWith(baseCode[0]));
            if (matched) {
                targetLang = matched;
                isSupported = true;
            }
        }

        if (!isSupported) {
            targetLang = this.defaultLanguage();
        }

        this.log.debug(`Language set to: ${targetLang}`);
        window.localStorage.setItem(LANGUAGE_KEY, targetLang);
        this.currentLanguageSignal.set(targetLang);

        const currentUrl = this.router.url;
        const currentLangPrefix = `/${this.currentLanguage()}/`;

        if (this.configuration.isProduction() && !currentUrl.startsWith(currentLangPrefix)) {
            this.router.navigateByUrl(`/${targetLang}${currentUrl}`);
        }
    }

    private getBrowserLanguage(): string {
        if (typeof navigator === "undefined") {
            return this.defaultLanguage();
        }
        return navigator.language;
    }
}
