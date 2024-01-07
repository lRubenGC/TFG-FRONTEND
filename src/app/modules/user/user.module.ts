import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { DCButtonComponent } from 'src/app/shared/components/dc-button/dc-button.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { DcUserMenuButtonComponent } from 'src/app/shared/components/dc-user-menu-button/dc-user-menu-button.component';
import { BasicCardComponent } from '../basic-cars/components/basic-card/basic-card.component';
import { CustomCardComponent } from '../custom-cars/components/custom-card/custom-card.component';
import { PremiumCardComponent } from '../premium-cars/components/premium-card/premium-card.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { UserHeaderCardComponent } from './components/user-header-card/user-header-card.component';
import { UserEditView } from './views/user-edit/user-edit.component';
import { UserProfileView } from './views/user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserProfileView,
    UserEditView,
    UserHeaderCardComponent,
    SlideMenuComponent,
  ],
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
    ToastModule,
    OverlayPanelModule,
    DcUserMenuButtonComponent,
  ],
})
export class UserModule {}
