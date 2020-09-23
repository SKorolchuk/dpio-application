import { LangSelectorComponent } from "./lang-selector.component";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";

describe("LangSelectorComponent", () => {
    let component: LangSelectorComponent;
    let fixture: ComponentFixture<LangSelectorComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, MaterialModule, NoopAnimationsModule],
            declarations: [LangSelectorComponent],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LangSelectorComponent);
        fixture.componentRef.instance.current = "en-US";
        fixture.componentRef.instance.languages = ["en-US", "de-DE"];
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
