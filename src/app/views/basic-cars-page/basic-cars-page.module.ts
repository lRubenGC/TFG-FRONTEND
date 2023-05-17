import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCarsPageComponent } from './basic-cars-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    BasicCarsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    ComponentsModule
  ]
})
export class BasicCarsPageModule { }
