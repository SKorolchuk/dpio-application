import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '@dpio-application/shared/src';
import { MaterialModule } from '@dpio-application/shared/src/lib/material.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
