import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { DcPremiumCardComponent } from 'src/app/shared/components/dc-premium-card/dc-premium-card.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumCarsPage } from './view/premium-cars.component';
@NgModule({
  declarations: [PremiumCarsPage],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    DcFilterComponent,
    DcDividerComponent,
    ToastModule,
    DcScrollToTopComponent,
    DcPremiumCardComponent,
  ],
  providers: [MessageService, DialogService],
})
export class PremiumCarsPageModule {}
