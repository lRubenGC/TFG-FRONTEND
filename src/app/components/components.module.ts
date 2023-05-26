import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCardComponent } from './basic-card/basic-card.component';
import { PremiumCardComponent } from './premium-card/premium-card.component';
import { GlobalNotificationComponent } from './global-notification/global-notification.component';
import { PremiumPillComponent } from './premium-pill/premium-pill.component';
import { UserCardComponent } from './user-card/user-card.component';



@NgModule({
  declarations: [
    BasicCardComponent,
    PremiumCardComponent,
    PremiumPillComponent,
    GlobalNotificationComponent,
    UserCardComponent
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
    PremiumPillComponent,
    GlobalNotificationComponent,
    UserCardComponent
  ]
})
export class ComponentsModule { }
