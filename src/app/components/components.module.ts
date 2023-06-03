import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCardComponent } from './basic-card/basic-card.component';
import { PremiumCardComponent } from './premium-card/premium-card.component';
import { GlobalNotificationComponent } from './global-notification/global-notification.component';
import { PremiumPillComponent } from './premium-pill/premium-pill.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { CustomCardComponent } from './custom-card/custom-card.component';



@NgModule({
  declarations: [
    BasicCardComponent,
    CustomCardComponent,
    PremiumCardComponent,
    PremiumPillComponent,
    GlobalNotificationComponent,
    ScrollToTopComponent,
    UserCardComponent,
    UploadImgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    BasicCardComponent,
    CustomCardComponent,
    PremiumCardComponent,
    PremiumPillComponent,
    GlobalNotificationComponent,
    ScrollToTopComponent,
    UserCardComponent,
    UploadImgComponent,
  ]
})
export class ComponentsModule { }
