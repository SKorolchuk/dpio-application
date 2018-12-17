import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { environment } from 'apps/dpio-application/src/environments/environment';

const CONFIGURATION_KEY = makeStateKey('configuration');

interface Environment {
  production: boolean;
  version: string;
  authEndpoint: string;
  appEndpoint: string;
  defaultLanguage: string;
  supportedLanguages: string[];
}
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private env: Environment;
  constructor(@Inject(PLATFORM_ID) private platfromId: Object, private state: TransferState) {
    if (this.isPlatformServer) {
      this.state.set<Environment>(CONFIGURATION_KEY, {
        authEndpoint: process.env['AUTH_ENDPOINT'] || environment.authEndpoint,
        appEndpoint: process.env['APP_ENDPOINT'] || environment.appEndpoint,
        version: process.env['VERSION'] || environment.version,
        production:
          Boolean(process.env['PRODUCTION']) !== undefined
            ? Boolean(process.env['PRODUCTION'])
            : environment.production,
        defaultLanguage: process.env['DEFAULT_LANGUAGE'] || environment.defaultLanguage,
        supportedLanguages: process.env['SUPPORTED_LANGUAGES']
          ? process.env['SUPPORTED_LANGUAGES'].split(',')
          : environment.supportedLanguages
      });
    }
    this.env = this.state.get<Environment>(CONFIGURATION_KEY, environment);
  }

  get authEndpoint(): string {
    return this.env.authEndpoint;
  }

  get appEndpoint(): string {
    return this.env.appEndpoint;
  }

  get isPlatformServer(): boolean {
    return isPlatformServer(this.platfromId);
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
