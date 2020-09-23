import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterPageComponent } from "./register-page.component";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { I18nService } from "@dpio-application/core/src/lib/i18n.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MockTranslateService } from "@dpio-application/core/src/lib/i18n.service.spec";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { CoreModule } from "@dpio-application/core/src";
import { AuthModule } from "@dpio-application/auth/src";
import { EffectsModule } from "@ngrx/effects";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("RegisterPageComponent", () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                CoreModule,
                AuthModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                RouterTestingModule,
                TranslateModule.forRoot(),
            ],
            declarations: [RegisterPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
