import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { I18nService } from '@dpio-application/core/src/lib/i18n.service';
import { SettingsService } from '@dpio-application/core/src/lib/settings.service';
import { AuthenticationService } from '../../shared/authentication.service';

@Component({
  selector: 'dpio-application-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  pending$ = this.store.pipe(select(selectLoginPagePending));
  error$ = this.store.pipe(select(selectLoginPageError));
  version: string;

  constructor(
    private store: Store<fromStore.AuthModulePartState>,
    private router: Router,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    settingsService: SettingsService
  ) {
    this.version = settingsService.version;
  }

  ngOnInit() {}

  public onSubmit($event: ILogin) {
    this.store.dispatch(new fromActions.Login($event));
  }

  public setLanguage(language: string) {
    this.i18nService.language = language;
  }

  public get currentLanguage(): string {
    return this.i18nService.language;
  }

  public get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
  registerUser({ value, valid }: { value: UserRegistration; valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.authenticationService
        .register(value.email, value.password, value.firstName, value.lastName, value.location)
        .pipe(finalize(() => (this.isRequesting = false)))
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
            }
          },
          errors => (this.errors = errors)
        );
    }
  }
}
