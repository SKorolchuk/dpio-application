import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

import { AuthenticationService } from "./authentication.service";
import { ConfigurationService, ENV_CONFIG_TOKEN, Environment } from "@lib/shared";
import { IAuthenticateSuccessResponse } from "../models/auth.models";
import { signal } from "@angular/core";

jest.mock("jwt-decode", () => ({
    jwtDecode: jest.fn().mockReturnValue({ exp: 999999, user_name: "test-user" }),
}));

const CREDENTIALS_KEY = "credentials";

describe("AuthenticationService", () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let mockConfigService: Partial<ConfigurationService>;

    const mockEnvironment: Environment = {
        production: false,
        version: "1.0.0-test",
        authEndpoint: "http://mock-api:5001",
        appEndpoint: "http://mock-app:4200",
        defaultLanguage: "en-US",
        supportedLanguages: ["en-US"],
    };

    const mockServerResponse: IAuthenticateSuccessResponse = {
        id: "user-uuid-111",
        auth_token: "mocked-jwt-token-string-999",
        expires_in: 3600,
    };

    beforeEach(() => {
        mockConfigService = {
            authEndpoint: signal("http://mock-api:5001"),
            isProduction: signal(false),
        };

        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: ConfigurationService, useValue: mockConfigService },
                { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment },
            ],
        });

        service = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        window.localStorage.clear();
        window.sessionStorage.clear();
        jest.restoreAllMocks();
    });

    it("should be created successfully", () => {
        expect(service).toBeTruthy();
    });

    describe("login workflow", () => {
        it("should successfully execute authorization and stream valid tokens metadata credentials", (done) => {
            service.login({ email: "user@localhost", password: "123", remember: true }).subscribe((response) => {
                expect(response).toBeDefined();
                expect(response.auth_token).toBe(mockServerResponse.auth_token);
                done();
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/token");
            expect(req.request.method).toBe("POST");
            req.flush(mockServerResponse);
        });

        it("should dynamically authenticate user status reactively via Signals graph", (done) => {
            expect(service.authenticated()).toBe(false);

            service.login({ email: "user@localhost", password: "123", remember: true }).subscribe(() => {
                expect(service.authenticated()).toBe(true);
                expect(service.credentials()).not.toBeNull();
                expect(service.credentials()?.token).toBe(mockServerResponse.auth_token);
                done();
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/token");
            req.flush(mockServerResponse);
        });

        it("should accurately cache temporary credentials session tokens mapping straight into sessionStorage", (done) => {
            service.login({ email: "user@localhost", password: "123", remember: false }).subscribe(() => {
                expect(window.sessionStorage.getItem(CREDENTIALS_KEY)).not.toBeNull();
                done();
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/token");
            req.flush(mockServerResponse);
        });

        it("should persist permanent authorization records cache arrays straight across localStorage boundaries", (done) => {
            service.login({ email: "user@localhost", password: "123", remember: true }).subscribe(() => {
                expect(window.localStorage.getItem(CREDENTIALS_KEY)).not.toBeNull();
                done();
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/token");
            req.flush(mockServerResponse);
        });
    });

    describe("logout workflow", () => {
        it("should flush session data clearings and securely reset reactivity signals values back to null states", (done) => {
            service.login({ email: "user@localhost", password: "123", remember: true }).subscribe(() => {
                expect(service.authenticated()).toBe(true);

                service.logout().subscribe(() => {
                    expect(service.authenticated()).toBe(false);
                    expect(service.credentials()).toBeNull();
                    expect(window.sessionStorage.getItem(CREDENTIALS_KEY)).toBeNull();
                    expect(window.localStorage.getItem(CREDENTIALS_KEY)).toBeNull();
                    done();
                });
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/token");
            req.flush(mockServerResponse);
        });
    });
});
