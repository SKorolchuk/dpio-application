import { TestBed } from "@angular/core/testing";
import { Route } from "./route.service";
import { ShellComponent } from "./shell/shell.component";
import { authenticationGuard } from "@lib/auth";

describe("Route Utility Layout Orchestrator", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
        });
    });

    describe("withShell", () => {
        it("should successfully nest target sub-routes as clean children nodes of the ShellComponent layout", () => {
            const mockFeatureRoutes = [{ path: "dashboard-view" }];

            const processedRoutes = Route.withShell(mockFeatureRoutes);

            expect(processedRoutes).toHaveLength(1);
            expect(processedRoutes[0].path).toBe("");
            expect(processedRoutes[0].component).toBe(ShellComponent);
            expect(processedRoutes[0].children).toBe(mockFeatureRoutes);

            expect(processedRoutes[0].canActivate).toContain(authenticationGuard);
        });
    });
});
