import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { signal } from "@angular/core";
import { ShellComponent } from "./shell.component";
import { AuthenticationService } from "@lib/auth";
import { ConfigurationService, ENV_CONFIG_TOKEN, Environment } from "@lib/shared";

describe("ShellComponent", () => {
    let component: ShellComponent;
    let fixture: ComponentFixture<ShellComponent>;
    let mockAuthService: Partial<AuthenticationService>;
    let mockConfigService: Partial<ConfigurationService>;

    const mockEnvironment: Environment = {
        production: false,
        version: "1.0.0-test",
        authEndpoint: "http://mock:5001",
        appEndpoint: "http://mock:4200",
        defaultLanguage: "en-US",
        supportedLanguages: ["en-US", "de-DE"],
    };

    beforeEach(async () => {
        mockAuthService = {
            credentials: signal({
                username: "test-modern-user",
                token: "mock-valid-jwt-handshake-signature-xyz",
            }),
            logout: jest.fn().mockImplementation(() => Promise.resolve()),
        };

        mockConfigService = {
            defaultLanguage: signal("en-US"),
            supportedLanguages: signal(["en-US", "de-DE"]),
            isProduction: signal(false),
        };

        await TestBed.configureTestingModule({
            imports: [ShellComponent],
            providers: [
                Title,
                provideRouter([]),
                { provide: AuthenticationService, useValue: mockAuthService },
                { provide: ConfigurationService, useValue: mockConfigService },
                { provide: ENV_CONFIG_TOKEN, useValue: mockEnvironment },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the standalone shell component successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should accurately resolve reactive username signal binding straight from the auth layer", () => {
        expect(component.username()).toBe("test-modern-user");
    });
});
