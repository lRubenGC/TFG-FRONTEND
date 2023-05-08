import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
