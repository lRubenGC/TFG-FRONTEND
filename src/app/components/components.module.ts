import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { CustomCardComponent } from './car-cards/custom-card/custom-card.component';
import { PremiumPillComponent } from './premium-pill/premium-pill.component';
import { ButtonsLegendComponent } from './shared/buttons-legend/buttons-legend.component';
import { DCButtonComponent } from './shared/dc-button/dc-button.component';
import { DCSecondaryButtonComponent } from './shared/dc-secondary-button/dc-secondary-button.component';
import { FilterPillComponent } from './shared/filter-pill/filter-pill.component';
import { GlobalNotificationComponent } from './shared/global-notification/global-notification.component';
import { MsgCardComponent } from './shared/msg-card/msg-card.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { UploadImgComponent } from './shared/upload-img/upload-img.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    ButtonsLegendComponent,
    CustomCardComponent,
    DCButtonComponent,
    DCSecondaryButtonComponent,
    FilterPillComponent,
    MsgCardComponent,
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
    ButtonsLegendComponent,
    CustomCardComponent,
    DCButtonComponent,
    DCSecondaryButtonComponent,
    FilterPillComponent,
    MsgCardComponent,
    PremiumPillComponent,
    GlobalNotificationComponent,
    ScrollToTopComponent,
    SpinnerComponent,
    UserCardComponent,
    UploadImgComponent,
  ],
})
export class ComponentsModule {}
