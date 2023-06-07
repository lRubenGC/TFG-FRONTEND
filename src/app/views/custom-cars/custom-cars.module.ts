import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCustomCarPageComponent } from './upload-custom-car-page/upload-custom-car-page.component';
import { CustomCarsPageComponent } from './custom-cars-page/custom-cars-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCarDetailedComponent } from './custom-car-detailed/custom-car-detailed.component';



@NgModule({
  declarations: [
    CustomCarDetailedComponent,
    CustomCarsPageComponent,
    UploadCustomCarPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class CustomCarsModule { }
