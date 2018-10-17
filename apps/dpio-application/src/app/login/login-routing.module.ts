import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { extract } from '@dpio-application/core/src/lib/i18n.service';

const routes: Routes = [{ path: 'login', component: LoginComponent, data: { title: extract('Login') } }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LoginRoutingModule {}
