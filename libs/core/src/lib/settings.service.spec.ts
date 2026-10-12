import { TestBed } from "@angular/core/testing";
import { SettingsService } from "./settings.service";
import { ENV_CONFIG_TOKEN, Environment } from "@lib/shared";

describe("SettingsService", () => {
    let service: SettingsService;

    const mockEnvironment: Environment = {
        production: false,
        version: "1.0.0-rc22",
        authEndpoint: "http://mock:5001",
        appEndpoint: "http://mock:4200",
        defaultLanguage: "en-US",
        supportedLanguages: ["en-US"],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SettingsService, { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment }],
        });
        service = TestBed.inject(SettingsService);
    });

    it("should be created successfully", () => {
        expect(service).toBeTruthy();
    });

    it("should expose application version parameter reactively via Signals", () => {
        expect(service.version()).toBe(mockEnvironment.version);
    });
});
