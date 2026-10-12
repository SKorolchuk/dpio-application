import { Routes } from "@angular/router";
import { authenticationGuard } from "@lib/auth";

export const homeRoutes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "home",
        loadComponent: () => import("./home.component").then((m) => m.HomeComponent),
        canActivate: [authenticationGuard],
        data: {
            title: "Home",
        },
    },
];
