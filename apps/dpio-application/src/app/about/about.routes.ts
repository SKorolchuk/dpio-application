import { Routes } from "@angular/router";
import { authenticationGuard } from "@lib/auth";

export const aboutRoutes: Routes = [
    {
        path: "about",
        loadComponent: () => import("./about.component").then((m) => m.AboutComponent),
        canActivate: [authenticationGuard],
        data: {
            title: "About",
        },
    },
];
