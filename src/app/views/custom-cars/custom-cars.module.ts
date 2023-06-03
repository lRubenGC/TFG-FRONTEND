import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCustomCarPageComponent } from './upload-custom-car-page/upload-custom-car-page.component';
import { CustomCarsPageComponent } from './custom-cars-page/custom-cars-page.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    CustomCarsPageComponent,
    UploadCustomCarPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class CustomCarsModule { }
