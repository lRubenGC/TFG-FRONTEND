import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutModule,
  ]
})
export class AuthModule { }
