import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoaderComponent } from "./loader.component";
import { By } from "@angular/platform-browser";

describe("LoaderComponent", () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should not display wrapper container by default", () => {
        const loaderContainer = fixture.debugElement.query(By.css("div.loader"));
        expect(loaderContainer).toBeNull();
    });

    it("should be visible when isLoading signal is set to true", () => {
        fixture.componentRef.setInput("isLoading", true);
        fixture.detectChanges();

        const loaderContainer = fixture.debugElement.query(By.css("div.loader"));
        expect(loaderContainer).not.toBeNull();
    });

    it("should display the specified text message inside span container", () => {
        const expectedMessage = "Optimizing workspace layout...";

        fixture.componentRef.setInput("isLoading", true);
        fixture.componentRef.setInput("message", expectedMessage);
        fixture.detectChanges();

        const spanElement = fixture.debugElement.query(By.css("span.message")).nativeElement;

        expect(spanElement.textContent?.trim()).toBe(expectedMessage);
    });
});
