import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { DCButtonComponent } from 'src/app/shared/components/dc-button/dc-button.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { CustomCarDetailedComponent } from './components/custom-car-detailed/custom-car-detailed.component';
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import { CustomCarsEditView } from './views/custom-cars-edit/custom-cars-edit.component';
import { CustomCarsListView } from './views/custom-cars-list/custom-cars-list.component';
import { CustomCarsUploadView } from './views/custom-cars-upload/custom-cars-upload.component';

@NgModule({
  declarations: [CustomCarsListView, CustomCarsUploadView, CustomCarsEditView],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    DcFilterComponent,
    DcScrollToTopComponent,
    CustomCardComponent,
    CustomCarDetailedComponent,
    DcDividerComponent,
    ToastModule,
    DCButtonComponent,
  ],
  providers: [],
})
export class CustomCarsModule {}
