import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { DetailedCarPageComponent } from './detailed-car-page.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    DetailedCarPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    ComponentsModule,
  ]
})
export class DetailedCarPageModule { }
