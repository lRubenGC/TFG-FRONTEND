import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  DCButtonComponent
} from 'src/app/shared/components/dc-secondary-button/dc-button.component';
import { LoginComponent } from './views/login/login.component';
import { RecoverAccountComponent } from './views/recover-account/recover-account.component';

@NgModule({
  declarations: [LoginComponent, RecoverAccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutModule,
    DCButtonComponent,
  ],
})
export class AuthModule {}
