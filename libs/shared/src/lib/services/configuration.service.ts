import { Injectable, InjectionToken, inject, signal, Signal } from "@angular/core";

export interface Environment {
    readonly production: boolean;
    readonly version: string;
    readonly authEndpoint: string;
    readonly appEndpoint: string;
    readonly defaultLanguage: string;
    readonly supportedLanguages: readonly string[];
}

export const ENV_CONFIG_TOKEN = new InjectionToken<Environment>("APP_ENVIRONMENT_CONFIGURATION");

@Injectable({
    providedIn: "root",
})
export class ConfigurationService {
    private readonly appEnvironment = inject(ENV_CONFIG_TOKEN);

    private readonly envConfig = signal<Environment>({
        authEndpoint: this.appEnvironment.authEndpoint,
        appEndpoint: this.appEnvironment.appEndpoint,
        version: this.appEnvironment.version,
        production: this.appEnvironment.production,
        defaultLanguage: this.appEnvironment.defaultLanguage,
        supportedLanguages: this.appEnvironment.supportedLanguages,
    });

    readonly authEndpoint: Signal<string> = signal(this.envConfig().authEndpoint).asReadonly();
    readonly appEndpoint: Signal<string> = signal(this.envConfig().appEndpoint).asReadonly();
    readonly isProduction: Signal<boolean> = signal(this.envConfig().production).asReadonly();
    readonly version: Signal<string> = signal(this.envConfig().version).asReadonly();
    readonly defaultLanguage: Signal<string> = signal(this.envConfig().defaultLanguage).asReadonly();
    readonly supportedLanguages: Signal<readonly string[]> = signal(this.envConfig().supportedLanguages).asReadonly();
}
