import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./home/home.routes").then((m) => m.homeRoutes),
    },
    {
        path: "",
        loadChildren: () => import("./about/about.routes").then((m) => m.aboutRoutes),
    },
    {
        path: "",
        loadChildren: () => import("@lib/auth").then((m) => m.authRoutes),
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
    },
];
