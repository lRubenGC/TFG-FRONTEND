import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicCarsView } from './view/basic-cars.component';
import { DcDropdownComponent } from 'src/app/shared/components/dc-filter/dc-dropdown.component';

@NgModule({
  declarations: [BasicCarsView],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    ComponentsModule,
    DcDropdownComponent
  ],
})
export class BasicCarsPageModule {}
