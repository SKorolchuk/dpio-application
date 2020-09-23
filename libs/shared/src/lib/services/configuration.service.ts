import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

interface Environment {
    production: boolean;
    version: string;
    authEndpoint: string;
    appEndpoint: string;
    defaultLanguage: string;
    supportedLanguages: string[];
}
@Injectable({
    providedIn: "root",
})
export class ConfigurationService {
    private env: Environment;
    constructor() {
        this.env = {
            authEndpoint: environment.authEndpoint,
            appEndpoint: environment.appEndpoint,
            version: environment.version,
            production: environment.production,
            defaultLanguage: environment.defaultLanguage,
            supportedLanguages: environment.supportedLanguages,
        };
    }

    get authEndpoint(): string {
        return this.env.authEndpoint;
    }

    get appEndpoint(): string {
        return this.env.appEndpoint;
    }

    get isProduction(): boolean {
        return this.env.production;
    }

    get version(): string {
        return this.env.version;
    }

    get defaultLanguage(): string {
        return this.env.defaultLanguage;
    }

    get supportedLanguages(): string[] {
        return this.env.supportedLanguages;
    }
}
