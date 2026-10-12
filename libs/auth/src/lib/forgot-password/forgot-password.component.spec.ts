import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ForgotPasswordComponent, ReactiveFormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the forgot password component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should successfully render the action submit button container inside template markup", () => {
        const submitButton = fixture.debugElement.query(By.css("button[type='submit']"));

        expect(submitButton).toBeDefined();
        expect(submitButton).not.toBeNull();
    });

    it("should block form submission and stay invalid if input email parameter is incorrect", () => {
        component.forgotForm.controls.email.setValue("invalid-email-format");
        fixture.detectChanges();

        expect(component.forgotForm.invalid).toBe(true);
    });

    it("should accurately validate controls and fire output streams on valid submission block", () => {
        const outputSpy = jest.fn();
        fixture.componentRef.instance.submitted.subscribe(outputSpy);

        component.forgotForm.controls.email.setValue("developer@localhost");
        fixture.detectChanges();

        component.onSubmit();

        expect(outputSpy).toHaveBeenCalledWith({
            email: "developer@localhost",
        });
    });
});
