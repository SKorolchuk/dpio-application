import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ShellComponent } from "./shell/shell.component";
import { AuthenticationService } from "../../../auth/src/lib/shared/authentication.service";
import { AuthenticationGuard } from "../../../auth/src/lib/shared/authentication.guard";
import { I18nService } from "./i18n.service";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { LangSelectorComponent } from "./lang-selector/lang-selector.component";
import { UserManagementService } from "@dpio-application/auth/src/lib/shared/user-management.service";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        FlexLayoutModule,
        MaterialModule,
        RouterModule,
    ],
    declarations: [ShellComponent, LangSelectorComponent],
    exports: [ShellComponent, LangSelectorComponent],
    providers: [
        AuthenticationService,
        UserManagementService,
        AuthenticationGuard,
        I18nService,
    ],
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        // Import guard
        if (parentModule) {
            throw new Error(
                `${parentModule} has already been loaded. Import Core module in the AppModule only.`
            );
        }
    }
}
