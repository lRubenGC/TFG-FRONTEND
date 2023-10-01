import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingCardComponent } from './components/landing-card/landing-card.component';
import { LandingPageComponent } from './landing-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LandingPageComponent,
    LandingCardComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
  ]
})
export class LandingPageModule { }
