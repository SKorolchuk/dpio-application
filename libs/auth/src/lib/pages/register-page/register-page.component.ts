import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { I18nService } from '@dpio-application/core/src/lib/i18n.service';
import { SettingsService } from '@dpio-application/core/src/lib/settings.service';
import { AuthenticationService } from '../../shared/authentication.service';
import * as fromActions from '../../actions/authorize.actions';
import * as fromStore from '../../reducers';
import { selectRegisterPageError, selectRegisterPagePending } from '../../selectors/auth.selectors';
import { UserRegistration } from '../../shared/user.registration.interface';

@Component({
  selector: 'dpio-application-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  pending$ = this.store.pipe(select(selectRegisterPagePending));
  error$ = this.store.pipe(select(selectRegisterPageError));
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

  public goToLogin(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  public onSubmit($event: UserRegistration) {
    this.store.dispatch(new fromActions.Register($event));
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
}
