import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutModule,
  ]
})
export class AuthModule { }
