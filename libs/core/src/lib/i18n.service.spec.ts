import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { I18nService } from "./i18n.service";
import { ConfigurationService } from "@lib/shared";
import { signal } from "@angular/core";

describe("I18nService", () => {
    let service: I18nService;
    let router: Router;
    let mockConfigService: Partial<ConfigurationService>;

    const defaultLanguageSignal = signal<string>("en-US");
    const supportedLanguagesSignal = signal<readonly string[]>(["en-US", "de-DE"]);
    const isProductionSignal = signal<boolean>(false);

    beforeEach(() => {
        mockConfigService = {
            defaultLanguage: defaultLanguageSignal,
            supportedLanguages: supportedLanguagesSignal,
            isProduction: isProductionSignal,
        };

        TestBed.configureTestingModule({
            providers: [I18nService, provideRouter([]), { provide: ConfigurationService, useValue: mockConfigService }],
        });

        service = TestBed.inject(I18nService);
        router = TestBed.inject(Router);
    });

    afterEach(() => {
        window.localStorage.clear();
        jest.restoreAllMocks();
    });

    it("should be created successfully", () => {
        expect(service).toBeTruthy();
    });

    describe("init", () => {
        it("should initialize with the system default language configuration", () => {
            service.init();
            expect(service.currentLanguage()).toBe("en-US");
        });
    });

    describe("setLanguage", () => {
        it("should shift current active state when supported language token is passed", () => {
            service.init();
            service.setLanguage("de-DE");
            expect(service.currentLanguage()).toBe("de-DE");
        });

        it("should route to localized path in production environments", () => {
            isProductionSignal.set(true);
            jest.spyOn(router, "navigateByUrl").mockImplementation(() => Promise.resolve(true));

            service.init();
            service.setLanguage("de-DE");

            expect(router.navigateByUrl).toHaveBeenCalledWith("/de-DE/");
        });
    });
});
