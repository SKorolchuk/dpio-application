import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import * as fromAuthorize from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { AuthorizeEffects } from "./effects/authorize.effects";
import { LogOutPromptComponent } from "./log-out-prompt/log-out-prompt.component";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { CallbackComponent } from "./callback/callback.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@dpio-application/shared/src";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { CoreModule } from "@dpio-application/core/src";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ResetPasswordPageComponent } from "./pages/reset-password-page/reset-password-page.component";
import { UserManagementEffects } from "./effects/user-management.effects";

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        TranslateModule.forChild(),
        AuthRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature("authorize", fromAuthorize.reducers),
        EffectsModule.forFeature([AuthorizeEffects, UserManagementEffects]),
    ],
    declarations: [
        LogOutPromptComponent,
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        CallbackComponent,
        LoginPageComponent,
        RegisterPageComponent,
        ResetPasswordPageComponent,
    ],
    exports: [LoginPageComponent, RegisterPageComponent, ResetPasswordPageComponent],
})
export class AuthModule {}
