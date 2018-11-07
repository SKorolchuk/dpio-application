import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ResetModule } from './reset/reset.module';
import { ForgotModule } from './forgot/forgot.module';

@NgModule({
    imports: [CommonModule, LoginModule, RegisterModule, ResetModule, ForgotModule]
})
export class AuthModule {}
