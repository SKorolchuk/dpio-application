import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";

@NgModule({
    imports: [CommonModule, TranslateModule.forChild(), MaterialModule, AboutRoutingModule],
    declarations: [AboutComponent],
})
export class AboutModule {}
