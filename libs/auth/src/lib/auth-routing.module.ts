import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { extract } from '@dpio-application/core/src/lib/i18n.service';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
      { path: 'callback', component: CallbackComponent }
    ] as Routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
