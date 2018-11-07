import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ResetPasswordComponent],
    exports: [ResetPasswordComponent]
})
export class ResetModule {}
