import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BasicCarsPageComponent } from './basic-cars-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasicCarsPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class BasicCarsPageModule { }
