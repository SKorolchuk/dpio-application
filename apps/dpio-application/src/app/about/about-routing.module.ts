import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about.component";
import { Route } from "@dpio-application/core/src/lib/route.service";
import { extract } from "@dpio-application/core/src/lib/i18n.service";
import { AuthenticationGuard } from "@dpio-application/auth/src/lib/shared/authentication.guard";

const routes: Routes = Route.withShell([
    {
        path: "about",
        component: AboutComponent,
        canActivate: [AuthenticationGuard],
        data: { title: extract("About") },
    },
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AboutRoutingModule {}
