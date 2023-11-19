import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicCarsView } from './view/basic-cars.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcBasicCardComponent } from 'src/app/shared/components/dc-basic-card/dc-basic-card.component';

@NgModule({
  declarations: [BasicCarsView],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    DcFilterComponent,
    DcDividerComponent,
    DcBasicCardComponent
  ],
})
export class BasicCarsPageModule {}
