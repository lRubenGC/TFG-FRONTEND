import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { LoginComponent } from './views/login/login.component';
import { RecoverAccountComponent } from './views/recover-account/recover-account.component';

@NgModule({
  declarations: [LoginComponent, RecoverAccountComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutModule,
  ],
})
export class AuthModule {}
