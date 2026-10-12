import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { provideRouter } from "@angular/router";

import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegisterComponent, ReactiveFormsModule],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the register form component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should block form submission and stay invalid if password and confirmPassword fields mismatch", () => {
        component.registerForm.patchValue({
            email: "test@localhost",
            password: "securePassword123",
            confirmPassword: "differentPassword123",
            firstName: "test 1",
            lastName: "test 2",
            location: "localhost",
        });

        component.registerForm.updateValueAndValidity();
        fixture.detectChanges();

        expect(component.registerForm.hasError("passwordsMismatch")).toBe(true);
        expect(component.registerForm.invalid).toBe(true);
    });

    it("should accurately validate input controls fields and fire output streams on valid submission block", () => {
        const outputSpy = jest.fn();
        fixture.componentRef.instance.submitted.subscribe(outputSpy);

        component.registerForm.patchValue({
            email: "test@localhost",
            password: "securePassword123",
            confirmPassword: "securePassword123",
            firstName: "test 1",
            lastName: "test 2",
            location: "localhost",
        });

        component.registerForm.updateValueAndValidity();
        fixture.detectChanges();

        expect(component.registerForm.valid).toBe(true);

        component.onSubmit();

        expect(outputSpy).toHaveBeenCalledWith({
            email: "test@localhost",
            password: "securePassword123",
            firstName: "test 1",
            lastName: "test 2",
            location: "localhost",
        });
    });
});
