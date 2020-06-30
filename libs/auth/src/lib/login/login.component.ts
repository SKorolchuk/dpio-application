import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ILogin } from "../shared/credentials.interface";
import { IAuthenticateErrorResponse } from "../models/auth.models";

@Component({
    selector: "dpio-application-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    private EMAIL_REGEX: RegExp = /^ *([A-Za-z]|\d|[_%+-])+(\.([A-Za-z]|\d|[_%+-])+)*@([A-Za-z]|\d|[-])+(\.([A-Za-z]|\d|[-])+)*(\.[A-Za-z]{2,4}) *$/;

    loginForm: FormGroup;

    @Output() submitted = new EventEmitter<ILogin>();

    @Input() public pending: boolean;

    @Input() public errorMessage: IAuthenticateErrorResponse;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {}

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: [
                "",
                Validators.compose([Validators.required, Validators.email, Validators.pattern(this.EMAIL_REGEX)]),
            ],
            password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
            remember: true,
        });
    }

    onSubmit() {
        this.submitted.emit({
            email: this.loginForm.controls["username"].value,
            password: this.loginForm.controls["password"].value,
            remember: this.loginForm.controls["remember"].value,
        });
        this.loginForm.markAsPristine();
    }
}
