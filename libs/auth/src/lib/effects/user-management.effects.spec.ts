import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { Observable, of } from "rxjs";
import { signal } from "@angular/core";

import { UserManagementEffects } from "./user-management.effects";
import { UserManagementService } from "../shared/user-management.service";
import { ConfigurationService, ENV_CONFIG_TOKEN, Environment } from "@lib/shared";

describe("UserManagementEffects", () => {
    let actions$!: Observable<unknown>;
    let effects: UserManagementEffects;
    let mockConfigService: Partial<ConfigurationService>;

    const mockEnvironment: Environment = {
        production: false,
        version: "1.0.0-test",
        authEndpoint: "http://mock-api:5001",
        appEndpoint: "http://mock-app:4200",
        defaultLanguage: "en-US",
        supportedLanguages: ["en-US"],
    };

    beforeEach(() => {
        mockConfigService = {
            authEndpoint: signal("http://mock-api:5001"),
            isProduction: signal(false),
        };

        actions$ = of();

        TestBed.configureTestingModule({
            providers: [
                UserManagementEffects,
                provideMockActions(() => actions$),
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                UserManagementService,

                { provide: ConfigurationService, useValue: mockConfigService },
                { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment },
            ],
        });

        effects = TestBed.inject(UserManagementEffects);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should be created successfully", () => {
        expect(effects).toBeTruthy();
    });
});
