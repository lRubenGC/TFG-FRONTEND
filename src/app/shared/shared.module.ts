import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
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
    OverlayPanelModule,
    BrowserAnimationsModule,
  ],
  exports: [DcFilterComponent, DcHeaderComponent],
})
export class SharedModule {}
