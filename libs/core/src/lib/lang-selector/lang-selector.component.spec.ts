import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LangSelectorComponent } from "./lang-selector.component";
import { By } from "@angular/platform-browser";

describe("LangSelectorComponent", () => {
    let component: LangSelectorComponent;
    let fixture: ComponentFixture<LangSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LangSelectorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LangSelectorComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput("current", "en-US");
        fixture.componentRef.setInput("languages", ["en-US", "de-DE"]);

        fixture.detectChanges();
    });

    it("should create the language selector component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should display the active language token identity inside the dropdown menu trigger button", () => {
        const triggerButton = fixture.debugElement.query(By.css("button")).nativeElement;

        expect(triggerButton.textContent?.trim()).toContain("en-US");
    });

    it("should dispatch a clean output signal notification when a language item is selected", () => {
        const selectedOutputSpy = jest.fn();
        fixture.componentRef.instance.selected.subscribe(selectedOutputSpy);

        component.onLanguageSelected("de-DE");

        expect(selectedOutputSpy).toHaveBeenCalledWith("de-DE");
    });
});
