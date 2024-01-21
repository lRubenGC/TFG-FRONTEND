import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { BasicCardComponent } from 'src/app/modules/basic-cars/components/basic-card/basic-card.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicCarsGroupComponent } from './components/basic-cars-group/basic-cars-group.component';
import { BasicCarsPage } from './view/basic-cars.component';
@NgModule({
  declarations: [BasicCarsPage],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    DcFilterComponent,
    DcDividerComponent,
    BasicCardComponent,
    BasicCarsGroupComponent,
    ToastModule,
    DcScrollToTopComponent,
  ],
  providers: [MessageService, DialogService],
})
export class BasicCarsModule {}
