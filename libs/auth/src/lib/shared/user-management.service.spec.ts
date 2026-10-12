import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { signal } from "@angular/core";

import { UserManagementService } from "./user-management.service";
import { ConfigurationService, ENV_CONFIG_TOKEN, Environment } from "@lib/shared";
import { IRegisterSuccessResponse } from "../models/auth.models";
import { UserPasswordReset, UserRegistration } from "./user.management.interface";

describe("UserManagementService", () => {
    let service: UserManagementService;
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

    const mockSuccessResponse: IRegisterSuccessResponse = {
        statusCode: 200,
        message: "Operation completed successfully",
    };

    beforeEach(() => {
        mockConfigService = {
            authEndpoint: signal("http://mock-api:5001"),
            isProduction: signal(false),
        };

        TestBed.configureTestingModule({
            providers: [
                UserManagementService,
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: ConfigurationService, useValue: mockConfigService },
                { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment },
            ],
        });

        service = TestBed.inject(UserManagementService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        jest.restoreAllMocks();
    });

    it("should be created successfully", () => {
        expect(service).toBeTruthy();
    });

    describe("register endpoint flow", () => {
        it("should successfully dispatch user registration details and return server response DTO", (done) => {
            const mockRegistrationModel: UserRegistration = {
                email: "newuser@localhost",
                password: "safe-password",
                firstName: "test 12",
                lastName: "test 1",
                location: "US",
            };

            service.register(mockRegistrationModel).subscribe((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(200);
                expect(response.message).toContain("Operation completed successfully");
                done();
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/register");
            expect(req.request.method).toBe("POST");
            req.flush(mockSuccessResponse);
        });
    });

    describe("resetPassword endpoint flow", () => {
        it("should trigger secure identity updates via functional HTTP channels pipeline", (done) => {
            const mockResetModel: UserPasswordReset = {
                email: "user@localhost",
                password: "new-password",
                confirmPassword: "new-password",
            };

            service.resetPassword(mockResetModel).subscribe((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(200);
                done();
            });

            const req = httpMock.expectOne("http://mock-api:5001/api/identity/reset");
            expect(req.request.method).toBe("POST");
            req.flush(mockSuccessResponse);
        });
    });
});
