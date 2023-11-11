import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { DcFilterComponent } from './components/dc-filter/dc-filter.component';
import { DcHeaderComponent } from './components/dc-header/dc-header.component';

@NgModule({
  declarations: [DcFilterComponent, DcHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [DcFilterComponent, DcHeaderComponent],
})
export class SharedModule {}
