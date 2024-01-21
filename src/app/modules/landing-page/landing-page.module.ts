import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { DCLandingCardComponent } from './components/dc-landing-card/dc-landing-card.component';
import { DCTextCardComponent } from './components/dc-text-card/dc-text-card.component';
import { LandingPageComponent } from './view/landing-page.component';
import { DCButtonComponent } from 'src/app/shared/components/dc-button/dc-button.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    DCLandingCardComponent,
    DCTextCardComponent,
  ],
  imports: [CommonModule, TranslateModule, DCButtonComponent],
})
export class LandingPageModule {}
