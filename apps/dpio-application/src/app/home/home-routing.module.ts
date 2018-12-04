import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { extract } from '@dpio-application/core/src/lib/i18n.service';
import { Route } from '@dpio-application/core/src/lib/route.service';
import { AuthenticationGuard } from '@dpio-application/auth/src/lib/shared/authentication.guard';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: extract('Home') } },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard], data: { title: extract('Home') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {}
