/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { provideStore, provideState } from "@ngrx/store";

import { authenticationGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";
import { MockAuthenticationService } from "./authentication.service.mock";
import { authorizeReducer } from "../reducers";

describe("authenticationGuard", () => {
    let mockRouter: jest.Mocked<Partial<Router>>;
    let mockAuthService: MockAuthenticationService;

    beforeEach(() => {
        mockRouter = {
            navigate: jest.fn().mockImplementation(() => Promise.resolve(true)),
        };

        TestBed.configureTestingModule({
            providers: [
                provideStore(),
                provideState({ name: "authorize", reducer: authorizeReducer }),

                {
                    provide: AuthenticationService,
                    useClass: MockAuthenticationService,
                },
                { provide: Router, useValue: mockRouter },
            ],
        });

        mockAuthService = TestBed.inject(AuthenticationService) as unknown as MockAuthenticationService;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should permit routing access navigation if the user session state is currently authenticated", () => {
        mockAuthService.credentialsSignal.set({ username: "admin", token: "valid-jwt" });

        const canActivateResult = TestBed.runInInjectionContext(() => authenticationGuard({} as any, {} as any));

        expect(canActivateResult).toBe(true);
        expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it("should completely deny routing access and trigger secure redirect if user session is empty or null", () => {
        mockAuthService.credentialsSignal.set(null);

        const canActivateResult = TestBed.runInInjectionContext(() => authenticationGuard({} as any, {} as any));

        expect(canActivateResult).toBe(false);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/user/login"]);
    });
});
