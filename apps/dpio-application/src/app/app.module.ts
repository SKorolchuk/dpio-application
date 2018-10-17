import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@dpio-application/shared/src/lib/material.module';
import { SharedModule } from '@dpio-application/shared/src';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from '@dpio-application/core/src';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        FormsModule,
        HttpModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HomeModule,
        AboutModule,
        LoginModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
