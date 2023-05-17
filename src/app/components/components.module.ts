import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { BasicCardComponent } from './basic-card/basic-card.component';
import { PremiumCardComponent } from './premium-card/premium-card.component';



@NgModule({
  declarations: [
    BasicCardComponent,
    PremiumCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    BasicCardComponent,
    PremiumCardComponent
  ]
})
export class ComponentsModule { }
