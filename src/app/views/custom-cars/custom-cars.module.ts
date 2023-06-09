import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCustomCarPageComponent } from './upload-custom-car-page/upload-custom-car-page.component';
import { CustomCarsPageComponent } from './custom-cars-page/custom-cars-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCarDetailedComponent } from './custom-car-detailed/custom-car-detailed.component';
import { SharedModule } from '../shared/shared.module';
import { EditCustomCarComponent } from './edit-custom-car/edit-custom-car.component';



@NgModule({
  declarations: [
    CustomCarDetailedComponent,
    CustomCarsPageComponent,
    EditCustomCarComponent,
    UploadCustomCarPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ]
})
export class CustomCarsModule { }
