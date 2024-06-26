import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { PremiumCardComponent } from 'src/app/modules/premium-cars/components/premium-card/premium-card.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { DCSkeletonComponent } from 'src/app/shared/components/dc-skeleton/dc-skeleton.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumCarsGroupComponent } from './components/premium-cars-group/premium-cars-group.component';
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
    PremiumCardComponent,
    PremiumCarsGroupComponent,
    DCSkeletonComponent,
  ],
  providers: [MessageService, DialogService],
})
export class PremiumCarsModule {}
