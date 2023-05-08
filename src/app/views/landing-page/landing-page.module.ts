import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingCardComponent } from './components/landing-card/landing-card.component';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LandingPageComponent,
    LandingCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LandingPageModule { }
