import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { signal } from "@angular/core";

import { AuthorizeEffects } from "./authorize.effects";
import { AuthenticationService } from "../shared/authentication.service";
import { ConfigurationService, ENV_CONFIG_TOKEN, Environment } from "@lib/shared";
import { Logger } from "@lib/core/logger";

jest.mock("jwt-decode", () => ({
    jwtDecode: jest.fn().mockReturnValue({ exp: 999999, user_name: "test-user" }),
}));

describe("AuthorizeEffects", () => {
    let actions$!: Observable<unknown>;
    let effects: AuthorizeEffects;
    let mockConfigService: Partial<ConfigurationService>;

    const mockEnvironment: Environment = {
        production: false,
        version: "1.0.0-test",
        authEndpoint: "http://mock-api:5001",
        appEndpoint: "http://mock-app:4200",
        defaultLanguage: "en-US",
        supportedLanguages: ["en-US"],
    };

    const mockDialogService = {
        open: jest.fn().mockReturnValue({
            afterClosed: () => of(true),
        }),
    };

    beforeEach(() => {
        mockConfigService = {
            authEndpoint: signal("http://mock-api:5001"),
            isProduction: signal(false),
        };

        actions$ = of();

        TestBed.configureTestingModule({
            providers: [
                AuthorizeEffects,
                provideMockActions(() => actions$),
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                { provide: MatDialog, useValue: mockDialogService },
                { provide: ConfigurationService, useValue: mockConfigService },
                { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment },
                AuthenticationService,
                Logger,
            ],
        });

        effects = TestBed.inject(AuthorizeEffects);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should be created successfully", () => {
        expect(effects).toBeTruthy();
    });
});
