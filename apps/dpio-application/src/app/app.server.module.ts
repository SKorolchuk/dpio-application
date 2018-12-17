import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CookieService, CookieBackendService } from 'ngx-cookie';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AppModule,
    NoopAnimationsModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule
  ],
  providers: [
    {
      provide: CookieService,
      useClass: CookieBackendService
    }
    // Add universal-only providers here
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
  constructor() {}
}
