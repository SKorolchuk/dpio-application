import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@dpio-application/core/src/lib/i18n.service';
import { CallbackComponent } from './callback/callback.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'auth/login', component: LoginPageComponent, data: { title: extract('Login') } },
      { path: 'auth/register', component: RegisterPageComponent, data: { title: extract('Register') } },
      { path: 'auth/reset', component: ResetPasswordPageComponent, data: { title: extract('Reset Password') } },
      { path: 'auth/callback', component: CallbackComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
