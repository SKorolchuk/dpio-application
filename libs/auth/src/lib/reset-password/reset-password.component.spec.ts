import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";

import { ResetPasswordComponent } from "./reset-password.component";

describe("ResetPasswordComponent", () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ResetPasswordComponent, ReactiveFormsModule],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the reset password form component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should block form submission and stay invalid if password and confirmPassword fields mismatch", () => {
        component.resetForm.patchValue({
            email: "user@localhost",
            password: "securePassword123",
            confirmPassword: "differentPassword123",
        });

        component.resetForm.updateValueAndValidity();
        fixture.detectChanges();

        expect(component.resetForm.hasError("passwordsMismatch")).toBe(true);
        expect(component.resetForm.invalid).toBe(true);
    });

    it("should accurately validate input controls fields and fire output streams on valid submission block", () => {
        const outputSpy = jest.fn();
        fixture.componentRef.instance.submitted.subscribe(outputSpy);

        component.resetForm.patchValue({
            email: "user@localhost",
            password: "securePassword123",
            confirmPassword: "securePassword123",
        });

        component.resetForm.updateValueAndValidity();
        fixture.detectChanges();

        expect(component.resetForm.valid).toBe(true);

        component.onSubmit();

        expect(outputSpy).toHaveBeenCalledWith({
            email: "user@localhost",
            password: "securePassword123",
            confirmPassword: "securePassword123",
        });
    });
});
