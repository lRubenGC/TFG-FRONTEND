import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCarsPageComponent } from './basic-cars-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasicCarsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class BasicCarsPageModule { }
