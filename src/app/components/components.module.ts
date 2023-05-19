import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCardComponent } from './basic-card/basic-card.component';
import { PremiumCardComponent } from './premium-card/premium-card.component';
import { GlobalNotificationComponent } from './global-notification/global-notification.component';



@NgModule({
  declarations: [
    BasicCardComponent,
    PremiumCardComponent,
    GlobalNotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    BasicCardComponent,
    PremiumCardComponent,
    GlobalNotificationComponent
  ]
})
export class ComponentsModule { }
