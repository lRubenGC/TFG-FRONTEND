import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { PrivacyPoliciesComponent } from './view/privacy-policies.component';

@NgModule({
  declarations: [PrivacyPoliciesComponent],
  imports: [CommonModule, TranslateModule],
})
export class GoogleModule {}
