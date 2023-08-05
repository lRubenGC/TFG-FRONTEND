import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AboutCWPageComponent } from './about-cw-page.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    AboutCWPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ]
})
export class AboutCWModule { }
