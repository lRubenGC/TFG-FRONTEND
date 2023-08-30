import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCardComponent } from './car-cards/basic-card/basic-card.component';
import { PremiumCardComponent } from './car-cards/premium-card/premium-card.component';
import { GlobalNotificationComponent } from './shared/global-notification/global-notification.component';
import { PremiumPillComponent } from './premium-pill/premium-pill.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { UploadImgComponent } from './shared/upload-img/upload-img.component';
import { CustomCardComponent } from './car-cards/custom-card/custom-card.component';
import { HeaderComponent } from './shared/header-component/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MsgCardComponent } from './shared/msg-card/msg-card.component';
import { DCButtonComponent } from './shared/dc-button/dc-button.component';
import { FilterPillComponent } from './shared/filter-pill/filter-pill.component';



@NgModule({
  declarations: [
    BasicCardComponent,
    CustomCardComponent,
    DCButtonComponent,
    FilterPillComponent,
    HeaderComponent,
    MsgCardComponent,
    PremiumCardComponent,
    PremiumPillComponent,
    GlobalNotificationComponent,
    ScrollToTopComponent,
    SpinnerComponent,
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
    DCButtonComponent,
    FilterPillComponent,
    HeaderComponent,
    MsgCardComponent,
    PremiumCardComponent,
    PremiumPillComponent,
    GlobalNotificationComponent,
    ScrollToTopComponent,
    SpinnerComponent,
    UserCardComponent,
    UploadImgComponent,
  ]
})
export class ComponentsModule { }
