import { Component, inject, input, output } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { LoaderComponent } from "@lib/shared";
import { IResetPasswordErrorResponse } from "../models/auth.models";

export interface ForgotPasswordPayload {
    readonly email: string;
}

interface ForgotPasswordFormSchema {
    readonly email: FormControl<string>;
}

@Component({
    selector: "app-forgot-password",
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
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
    private readonly formBuilder = inject(NonNullableFormBuilder);

    readonly pending = input<boolean>(false);
    readonly errorMessage = input<IResetPasswordErrorResponse | string | null>(null);
    readonly submitted = output<ForgotPasswordPayload>();
    readonly forgotForm: FormGroup<ForgotPasswordFormSchema> = this.formBuilder.group({
        email: ["", [Validators.required, Validators.email]],
    });

    /**
     * Extracts raw values parameters and streams notification events to parent view orchestrator.
     */
    onSubmit(): void {
        if (this.forgotForm.invalid) {
            return;
        }

        const emailValue = this.forgotForm.controls.email.value;

        this.submitted.emit({
            email: emailValue,
        });

        this.forgotForm.markAsPristine();
    }
}
