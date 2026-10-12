import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { provideStore, provideState, Store } from "@ngrx/store";
import { signal } from "@angular/core";

import { LoginPageComponent } from "./login-page.component";
import { authorizeReducer } from "../../reducers";
import { I18nService, SettingsService } from "@lib/core";
import * as AuthActions from "../../actions/authorize.actions";

describe("LoginPageComponent", () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let store: Store;
    let mockRouter: jest.Mocked<Partial<Router>>;
    let mockI18nService: Partial<I18nService>;
    let mockSettingsService: Partial<SettingsService>;

    beforeEach(async () => {
        mockRouter = {
            navigate: jest.fn().mockImplementation(() => Promise.resolve(true)),
        };

        mockI18nService = {
            currentLanguage: signal("en-US"),
            supportedLanguages: signal(["en-US", "de-DE"]),
            setLanguage: jest.fn(),
        };

        mockSettingsService = {
            version: signal("1.0.0-mock-prod"),
        };

        await TestBed.configureTestingModule({
            imports: [LoginPageComponent],
            providers: [
                provideStore(),
                provideState({ name: "authorize", reducer: authorizeReducer }),
                provideRouter([]),

                { provide: Router, useValue: mockRouter },
                { provide: I18nService, useValue: mockI18nService },
                { provide: SettingsService, useValue: mockSettingsService },
            ],
        }).compileComponents();

        store = TestBed.inject(Store);
        jest.spyOn(store, "dispatch");
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the smart login page component container successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should accurately capture application properties straight from configuration signals graph", () => {
        expect(component.version()).toBe("1.0.0-mock-prod");
        expect(component.currentLanguage()).toBe("en-US");
        expect(component.languages()).toContain("de-DE");
    });

    it("should dispatch a clean functional login action creator when form is submitted successfully", () => {
        const mockCredentialsPayload = { email: "user@localhost", password: "safe-password-123", remember: true };

        component.onSubmit(mockCredentialsPayload);

        expect(store.dispatch).toHaveBeenCalledWith(AuthActions.login({ payload: mockCredentialsPayload }));
    });

    it("should trigger secure client-side navigation redirecting to register layout views", () => {
        component.goToSignUp();
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/user/register"], { replaceUrl: true });
    });

    it("should trigger secure client-side navigation redirecting to reset password layouts", () => {
        component.goToReset();
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/user/reset"], { replaceUrl: true });
    });
});
