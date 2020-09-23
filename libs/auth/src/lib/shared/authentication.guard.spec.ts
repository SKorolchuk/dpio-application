import { TestBed, inject } from "@angular/core/testing";
import { Router } from "@angular/router";

import { AuthenticationService } from "./authentication.service";
import { MockAuthenticationService } from "./authentication.service.mock";
import { AuthenticationGuard } from "./authentication.guard";
import { StoreModule } from "@ngrx/store";

describe("AuthenticationGuard", () => {
    let authenticationGuard: AuthenticationGuard;
    let authenticationService: MockAuthenticationService;
    let mockRouter: any;

    beforeEach(() => {
        mockRouter = {
            navigate: jasmine.createSpy("navigate"),
        };
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [
                AuthenticationGuard,
                {
                    provide: AuthenticationService,
                    useClass: MockAuthenticationService,
                },
                { provide: Router, useValue: mockRouter },
            ],
        });
    });

    beforeEach(inject(
        [AuthenticationGuard, AuthenticationService],
        (_authenticationGuard: AuthenticationGuard, _authenticationService: MockAuthenticationService) => {
            authenticationGuard = _authenticationGuard;
            authenticationService = _authenticationService;
        },
    ));

    it("should have a canActivate method", () => {
        expect(typeof authenticationGuard.canActivate).toBe("function");
    });

    it("should return true if user is authenticated", () => {
        expect(authenticationGuard.canActivate()).toBeDefined();
    });
});
