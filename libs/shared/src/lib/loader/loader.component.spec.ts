import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "../material.module";
import { LoaderComponent } from "./loader.component";
import { By } from "@angular/platform-browser";

describe("LoaderComponent", () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, MaterialModule],
            declarations: [LoaderComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should not be display message by default", () => {
        expect(fixture.debugElement.query(By.css("div"))).toBeNull();
    });

    it("should be visible when app is loading", () => {
        fixture.componentInstance.isLoading = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("div"))).not.toBeNull();
    });

    it("should display specified message", () => {
        const expectedMessage = "testing";

        fixture.componentInstance.message = expectedMessage;
        fixture.componentInstance.isLoading = true;
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css("span.message")).nativeElement;

        expect(span.innerHTML).toBe(expectedMessage);
    });
});
