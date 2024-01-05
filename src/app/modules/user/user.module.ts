import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { UserEditView } from './views/user-edit/user-edit.component';
import { UserProfileView } from './views/user-profile/user-profile.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DCButtonComponent } from 'src/app/shared/components/dc-button/dc-button.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { BasicCardComponent } from '../basic-cars/components/basic-card/basic-card.component';
import { PremiumCardComponent } from '../premium-cars/components/premium-card/premium-card.component';
import { CustomCardComponent } from '../custom-cars/components/custom-card/custom-card.component';

@NgModule({
  declarations: [UserProfileView, UserEditView],
  imports: [
    CommonModule,
    TranslateModule,
    DcFilterComponent,
    DcDividerComponent,
    DCButtonComponent,
    DcScrollToTopComponent,
    BasicCardComponent,
    PremiumCardComponent,
    CustomCardComponent,
  ],
})
export class UserModule {}
