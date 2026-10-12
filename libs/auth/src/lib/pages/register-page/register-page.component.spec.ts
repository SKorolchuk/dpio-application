import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { provideStore, provideState, Store } from "@ngrx/store";
import { signal } from "@angular/core";

import { RegisterPageComponent } from "./register-page.component";
import { authorizeReducer } from "../../reducers";
import { I18nService, SettingsService, Logger } from "@lib/core";
import * as AuthActions from "../../actions/authorize.actions";

describe("RegisterPageComponent", () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;
    let store: Store;
    let mockRouter: jest.Mocked<Partial<Router>>;
    let mockI18nService: Partial<I18nService>;
    let mockSettingsService: Partial<SettingsService>;
    let mockLogger: Partial<Logger>;

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

        mockLogger = {
            forContext: jest.fn().mockReturnValue({
                debug: jest.fn(),
                error: jest.fn(),
                warn: jest.fn(),
            }),
        };

        await TestBed.configureTestingModule({
            imports: [RegisterPageComponent],
            providers: [
                provideStore(),
                provideState({ name: "authorize", reducer: authorizeReducer }),
                provideRouter([]),

                { provide: Router, useValue: mockRouter },
                { provide: I18nService, useValue: mockI18nService },
                { provide: SettingsService, useValue: mockSettingsService },
                { provide: Logger, useValue: mockLogger },
            ],
        }).compileComponents();

        store = TestBed.inject(Store);
        jest.spyOn(store, "dispatch");
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the smart register page component container successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should accurately capture application properties straight from configuration signals graph", () => {
        expect(component.version()).toBe("1.0.0-mock-prod");
        expect(component.currentLanguage()).toBe("en-US");
        expect(component.languages()).toContain("de-DE");
    });

    it("should dispatch a clean functional register action creator when form is submitted successfully", () => {
        const mockRegisterPayload = {
            email: "newuser@localhost",
            password: "safePassword123",
            firstName: "John",
            lastName: "Doe",
            location: "localhost",
        };

        component.onSubmit(mockRegisterPayload);

        expect(store.dispatch).toHaveBeenCalledWith(AuthActions.register({ payload: mockRegisterPayload }));
    });

    it("should trigger secure client-side navigation redirecting back to login layout views", () => {
        component.goToLogin();

        expect(mockRouter.navigate).toHaveBeenCalledWith(["/"], { replaceUrl: true });
    });
});
