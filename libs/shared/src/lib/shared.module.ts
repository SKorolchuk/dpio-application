import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './loader/loader.component';
import { MaterialModule } from './material.module';
import { ConfigurationService } from './services/configuration.service';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent],
  providers: [ConfigurationService],
  exports: [LoaderComponent]
})
export class SharedModule {}
