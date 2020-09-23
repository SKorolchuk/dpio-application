import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetPasswordPageComponent } from "./reset-password-page.component";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { I18nService } from "@dpio-application/core/src/lib/i18n.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MockTranslateService } from "@dpio-application/core/src/lib/i18n.service.spec";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CoreModule } from "@dpio-application/core/src";
import { AuthModule } from "@dpio-application/auth/src";
import { EffectsModule } from "@ngrx/effects";

describe("ResetPasswordPageComponent", () => {
    let component: ResetPasswordPageComponent;
    let fixture: ComponentFixture<ResetPasswordPageComponent>;

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
            declarations: [ResetPasswordPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
