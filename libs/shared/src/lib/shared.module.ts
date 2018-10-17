import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './loader/loader.component';
import { MaterialModule } from './material.module';

@NgModule({
    imports: [FlexLayoutModule, MaterialModule, CommonModule],
    declarations: [LoaderComponent],
    exports: [LoaderComponent]
})
export class SharedModule {}
