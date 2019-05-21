import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dpio-application-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private EMAIL_REGEX: RegExp = /^ *([A-Za-z]|\d|[_%+-])+(\.([A-Za-z]|\d|[_%+-])+)*@([A-Za-z]|\d|[-])+(\.([A-Za-z]|\d|[-])+)*(\.[A-Za-z]{2,4}) *$/;

  resetForm: FormGroup;

  @Output() submitted = new EventEmitter<UserReset>();

  @Input() public pending: boolean;

  @Input() public errorMessage: IResetErrorResponse;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.resetForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.EMAIL_REGEX)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      },
      { validator: this.checkPasswords }
    );
  }

  onSubmit() {
    this.submitted.emit({
      email: this.resetForm.controls['email'].value,
      password: this.resetForm.controls['password'].value
    });
    this.resetForm.markAsPristine();
  }

  checkPasswords(group: FormGroup) {
    if (!group || !group.controls || !group.controls.password || !group.controls.confirmPass) return null;
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
