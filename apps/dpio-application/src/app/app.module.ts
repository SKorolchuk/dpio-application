import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MaterialModule } from '@dpio-application/shared/src/lib/material.module';
import { SharedModule } from '@dpio-application/shared/src';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { CoreModule } from '@dpio-application/core/src';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';
import { CookieModule } from 'ngx-cookie';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from '@dpio-application/auth/src';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({
            appId: 'dpio-application'
        }),
        BrowserTransferStateModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NxModule.forRoot(),
        NgxUploaderModule,
        CookieModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HomeModule,
        AboutModule,
        AuthModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
