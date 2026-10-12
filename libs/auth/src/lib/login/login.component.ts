import { Component, inject, input, output, ANIMATION_MODULE_TYPE } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { ILogin } from "../shared/credentials.interface";
import { IAuthenticateErrorResponse } from "../models/auth.models";
import { LoaderComponent } from "@lib/shared";

interface LoginFormSchema {
    readonly username: FormControl<string>;
    readonly password: FormControl<string>;
    readonly remember: FormControl<boolean>;
}

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        LoaderComponent,
    ],
    providers: [{ provide: ANIMATION_MODULE_TYPE, useValue: "NoopAnimations" }],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    private readonly formBuilder = inject(NonNullableFormBuilder);

    readonly pending = input<boolean>(false);
    readonly errorMessage = input<IAuthenticateErrorResponse | string | null>(null);
    readonly submitted = output<ILogin>();

    readonly loginForm: FormGroup<LoginFormSchema> = this.formBuilder.group({
        username: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        remember: [true, [Validators.required]],
    });

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        const formValues = this.loginForm.getRawValue();

        this.submitted.emit({
            email: formValues.username,
            password: formValues.password,
            remember: formValues.remember,
        });

        this.loginForm.markAsPristine();
    }
}
