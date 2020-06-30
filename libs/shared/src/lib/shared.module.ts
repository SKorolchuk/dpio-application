import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoaderComponent } from "./loader/loader.component";
import { MaterialModule } from "./material.module";
import { ConfigurationService } from "./services/configuration.service";

@NgModule({
    imports: [MaterialModule, CommonModule],
    declarations: [LoaderComponent],
    providers: [ConfigurationService],
    exports: [LoaderComponent],
})
export class SharedModule {}
