import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
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
    RouterModule,
    DcDividerComponent,
  ],
  exports: [DcHeaderComponent],
})
export class SharedModule {}
