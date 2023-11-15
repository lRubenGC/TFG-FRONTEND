import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DcDividerComponent } from './components/dc-divider/dc-divider.component';
import { DcHeaderComponent } from './components/dc-header/dc-header.component';

@NgModule({
  declarations: [DcHeaderComponent],
  imports: [
    CommonModule,
    TranslateModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    DcDividerComponent,
  ],
  exports: [DcHeaderComponent],
})
export class SharedModule {}
