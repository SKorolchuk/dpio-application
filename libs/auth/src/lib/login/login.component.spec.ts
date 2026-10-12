import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";
import { By } from "@angular/platform-browser";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent, ReactiveFormsModule],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the login form component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should successfully render the action submit button container inside template markup", () => {
        const submitButtonSpan = fixture.debugElement.query(By.css("button[type='submit']"));

        expect(submitButtonSpan).toBeDefined();
        expect(submitButtonSpan).not.toBeNull();
    });

    it("should accurately validate input controls and fire output streams on valid submission", () => {
        const outputSpy = jest.fn();
        fixture.componentRef.instance.submitted.subscribe(outputSpy);

        component.loginForm.controls.username.setValue("developer@localhost");
        component.loginForm.controls.password.setValue("secure-password-123456");
        fixture.detectChanges();

        component.onSubmit();

        expect(outputSpy).toHaveBeenCalledWith({
            email: "developer@localhost",
            password: "secure-password-123456",
            remember: true,
        });
    });
});
