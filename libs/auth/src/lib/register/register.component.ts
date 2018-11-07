import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@dpio-application/core/src/lib/authentication/authentication.service';
import { UserRegistration } from '../shared/user.registration.interface';
import { I18nService } from '@dpio-application/core/src/lib/i18n.service';
@Component({
    selector: 'dpio-application-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    errors: string;
    isRequesting: boolean;
    submitted = false;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private i18nService: I18nService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {}
    registerUser({ value, valid }: { value: UserRegistration; valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.authenticationService
                .register(value.email, value.password, value.firstName, value.lastName, value.location)
                .finally(() => (this.isRequesting = false))
                .subscribe(result => {
                    if (result) {
                        this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
                    }
                }, errors => (this.errors = errors));
        }
    }
}
