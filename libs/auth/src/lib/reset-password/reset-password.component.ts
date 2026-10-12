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

import { IResetPasswordErrorResponse } from "../models/auth.models";
import { LoaderComponent } from "@lib/shared";
import { UserPasswordReset } from "../shared/user.management.interface";

interface ResetPasswordFormSchema {
    readonly email: FormControl<string>;
    readonly password: FormControl<string>;
    readonly confirmPassword: FormControl<string>;
}

@Component({
    selector: "app-reset-password",
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
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent {
    private readonly formBuilder = inject(NonNullableFormBuilder);

    readonly pending = input<boolean>(false);
    readonly errorMessage = input<IResetPasswordErrorResponse | string | null>(null);

    readonly submitted = output<UserPasswordReset>();

    readonly resetForm: FormGroup<ResetPasswordFormSchema> = this.formBuilder.group(
        {
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
            confirmPassword: ["", [Validators.required]],
        },
        { validators: [this.passwordsMatchValidator()] },
    );

    onSubmit(): void {
        if (this.resetForm.invalid) {
            return;
        }

        const formValues = this.resetForm.getRawValue();

        this.submitted.emit({
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
        });

        this.resetForm.markAsPristine();
    }

    private passwordsMatchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control as FormGroup<ResetPasswordFormSchema>;
            const password = formGroup.controls.password?.value;
            const confirmPassword = formGroup.controls.confirmPassword?.value;

            if (!password || !confirmPassword) {
                return null;
            }

            return password === confirmPassword ? null : { passwordsMismatch: true };
        };
    }
}
