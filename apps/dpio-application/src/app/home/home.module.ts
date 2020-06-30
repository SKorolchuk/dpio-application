import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { QuoteService } from "./quote.service";
import { CoreModule } from "@dpio-application/core/src";
import { SharedModule } from "@dpio-application/shared/src";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";

@NgModule({
    imports: [CommonModule, TranslateModule.forChild(), CoreModule, SharedModule, MaterialModule, HomeRoutingModule],
    declarations: [HomeComponent],
    providers: [QuoteService],
})
export class HomeModule {}
