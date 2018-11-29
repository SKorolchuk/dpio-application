import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ResetModule } from './reset/reset.module';
import { ForgotModule } from './forgot/forgot.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuthorize from './store/authorize.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthorizeEffects } from './store/authorize.effects';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    ResetModule,
    ForgotModule,
    StoreModule.forFeature('authorize', fromAuthorize.reducer),
    EffectsModule.forFeature([AuthorizeEffects])
  ],
  declarations: []
})
export class AuthModule {}
