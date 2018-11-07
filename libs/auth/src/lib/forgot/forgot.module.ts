import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ForgotPasswordComponent],
    exports: [ForgotPasswordComponent]
})
export class ForgotModule {}
