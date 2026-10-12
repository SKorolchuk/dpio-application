import { Routes } from "@angular/router";
import { ShellComponent } from "./shell/shell.component";
import { authenticationGuard } from "@lib/auth";

export class Route {
    static withShell(routes: Routes): Routes {
        return [
            {
                path: "",
                component: ShellComponent,
                children: routes,
                canActivate: [authenticationGuard],
            },
        ];
    }
}
