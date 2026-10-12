import { Component, inject, input, output, ANIMATION_MODULE_TYPE } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { IRegisterErrorResponse } from "../models/auth.models";
import { LoaderComponent } from "@lib/shared";
import { UserRegistration } from "../shared/user.management.interface";

interface RegisterFormSchema {
    readonly email: FormControl<string>;
    readonly password: FormControl<string>;
    readonly confirmPassword: FormControl<string>;
    readonly firstName: FormControl<string>;
    readonly lastName: FormControl<string>;
    readonly location: FormControl<string>;
}

@Component({
    selector: "app-register",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        LoaderComponent,
    ],
    providers: [{ provide: ANIMATION_MODULE_TYPE, useValue: "NoopAnimations" }],
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
    private readonly formBuilder = inject(NonNullableFormBuilder);

    readonly pending = input<boolean>(false);
    readonly errorMessage = input<IRegisterErrorResponse | string | null>(null);
    readonly submitted = output<UserRegistration>();

    readonly registerForm: FormGroup<RegisterFormSchema> = this.formBuilder.group(
        {
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
            confirmPassword: ["", [Validators.required]],
            firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            location: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        },
        { validators: [this.passwordsMatchValidator()] },
    );

    onSubmit(): void {
        if (this.registerForm.invalid) {
            return;
        }

        const formValues = this.registerForm.getRawValue();

        this.submitted.emit({
            email: formValues.email,
            password: formValues.password,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            location: formValues.location,
        });

        this.registerForm.markAsPristine();
    }

    private passwordsMatchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control as FormGroup<RegisterFormSchema>;
            const password = formGroup.controls.password?.value;
            const confirmPassword = formGroup.controls.confirmPassword?.value;

            if (!password || !confirmPassword) {
                return null;
            }

            return password === confirmPassword ? null : { passwordsMismatch: true };
        };
    }
}
