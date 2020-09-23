import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetPasswordComponent } from "./reset-password.component";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CoreModule } from "@dpio-application/core/src";
import { AuthModule } from "@dpio-application/auth/src";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogRef } from "@angular/material/dialog";

describe("ResetPasswordComponent", () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

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
            declarations: [ResetPasswordComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
