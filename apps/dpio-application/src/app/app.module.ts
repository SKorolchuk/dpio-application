import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { SharedModule } from "@dpio-application/shared/src";
import { HomeModule } from "./home/home.module";
import { AboutModule } from "./about/about.module";
import { CoreModule } from "@dpio-application/core/src";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthModule } from "@dpio-application/auth/src";
import { reducers } from "@dpio-application/auth/src/lib/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            name: "Auth0 Book Library",
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]),
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        CoreModule,
        HomeModule,
        AboutModule,
        AuthModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
