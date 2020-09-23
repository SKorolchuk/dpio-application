import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginComponent } from "./login.component";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { SharedModule } from "@dpio-application/shared/src";
import { CoreModule } from "@dpio-application/core/src";
import { By } from "@angular/platform-browser";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MaterialModule,
                SharedModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
                ReactiveFormsModule,
                CoreModule,
            ],
            declarations: [LoginComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render title in a h1 tag", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const loginText = fixture.debugElement.query(By.css("button > span"));
            expect(loginText).toBeDefined();
        });
    }));
});
