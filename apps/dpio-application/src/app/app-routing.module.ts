import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { extract } from "@dpio-application/core/src/lib/i18n.service";

const routes: Routes = [
    // Fallback when no prior route is matched
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
        data: { title: extract("Home") },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule {}
