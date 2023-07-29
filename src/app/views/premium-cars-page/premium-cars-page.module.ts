import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { PremiumCarsPageComponent } from './premium-cars-page.component';



@NgModule({
  declarations: [
    PremiumCarsPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    ComponentsModule,
  ]
})
export class PremiumCarsPageModule { }
