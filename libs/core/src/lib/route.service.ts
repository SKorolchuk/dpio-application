import { Routes } from "@angular/router";

import { ShellComponent } from "./shell/shell.component";
import { AuthenticationGuard } from "../../../auth/src/lib/shared/authentication.guard";

/**
 * Provides helper methods to create routes.
 */
export class Route {
    /**
     * Creates routes using the shell component and authentication.
     * @param routes The routes to add.
     * @return The new routes using shell as the base.
     */
    static withShell(routes: Routes): Routes {
        return [
            {
                path: "",
                component: ShellComponent,
                children: routes,
                canActivate: [AuthenticationGuard],
            },
        ];
    }
}
