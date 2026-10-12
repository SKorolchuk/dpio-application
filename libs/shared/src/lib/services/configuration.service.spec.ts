import { TestBed } from "@angular/core/testing";
import { ConfigurationService, ENV_CONFIG_TOKEN, Environment } from "./configuration.service";

describe("ConfigurationService", () => {
    let service: ConfigurationService;

    const mockEnvironment: Environment = {
        production: false,
        version: "testing-v22",
        authEndpoint: "http://mock-auth:5001",
        appEndpoint: "http://mock-app:4200",
        defaultLanguage: "en-US",
        supportedLanguages: ["en-US", "de-DE"],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigurationService, { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment }],
        });
        service = TestBed.inject(ConfigurationService);
    });

    it("should be created successfully", () => {
        expect(service).toBeTruthy();
    });

    it("should correctly wrap injected token parameters into reactive Signals", () => {
        expect(service.isProduction()).toBe(mockEnvironment.production);
        expect(service.version()).toBe(mockEnvironment.version);
        expect(service.authEndpoint()).toBe(mockEnvironment.authEndpoint);
        expect(service.appEndpoint()).toBe(mockEnvironment.appEndpoint);
        expect(service.defaultLanguage()).toBe(mockEnvironment.defaultLanguage);
        expect(service.supportedLanguages()).toEqual(mockEnvironment.supportedLanguages);
    });
});
