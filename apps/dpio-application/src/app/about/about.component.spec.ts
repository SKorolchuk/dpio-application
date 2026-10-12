import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import { By } from "@angular/platform-browser";

import { AboutComponent } from "./about.component";
import { SettingsService } from "@lib/core";

describe("AboutComponent", () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let mockSettingsService: Partial<SettingsService>;

    beforeEach(async () => {
        mockSettingsService = {
            version: signal("2.5.0-rc-test"),
        };

        await TestBed.configureTestingModule({
            imports: [AboutComponent],
            providers: [{ provide: SettingsService, useValue: mockSettingsService }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the standalone about component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should accurately capture and display the application version parameter from settings signal graph", () => {
        expect(component.version()).toBe("2.5.0-rc-test");

        const contentElement = fixture.debugElement.query(By.css("mat-card-content"));

        expect(contentElement).not.toBeNull();
        expect(contentElement.nativeElement.textContent).toContain("2.5.0-rc-test");
    });
});
