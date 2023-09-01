import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { AboutCWPageComponent } from './about-cw/about-cw-page.component';
import { UpdatesPageComponent } from './updates/updates-page.component';



@NgModule({
  declarations: [
    AboutCWPageComponent,
    UpdatesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ]
})
export class InfoModule { }
