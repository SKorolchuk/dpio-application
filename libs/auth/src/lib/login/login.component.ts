import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { I18nService } from '@dpio-application/core/src/lib/i18n.service';
import { AuthenticationService } from '@dpio-application/auth/src/lib/shared/authentication.service';
import { Logger } from '@dpio-application/core/src/lib/logger.service';
import { SettingsService } from '@dpio-application/core/src/lib/settings.service';

const log = new Logger('Login');

@Component({
  selector: 'dpio-application-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string;
  error: string = null;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private settingsService: SettingsService
  ) {
    this.createForm();

    this.version = settingsService.version;
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
