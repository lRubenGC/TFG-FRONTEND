import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';

export interface opOptions {
  text: string;
  icon: string | null;
  key: string;
}

@Component({
  selector: 'dc-user-menu-button',
  standalone: true,
  templateUrl: './dc-user-menu-button.component.html',
  styleUrls: ['./dc-user-menu-button.component.scss'],
  imports: [
    RouterModule,
    TranslateModule,
    CommonModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
  ],
})
export class DcUserMenuButtonComponent {
  //#region INPUTS
  @Input() type: 'anchor' | 'button' | 'op' = 'button';
  @Input() text: string = '';
  @Input() link: string = '';
  @Input() linkObject?: string = '';
  @Input() icon: string = '';
  @Input() opOptions: opOptions[] = [];
  @Input() opWidth: string = '200px';
  //#endregion INPUTS
  
  //#region OUTPUTS
  @Output() onOpOptionSelected = new EventEmitter<string>();
  //#endregion OUTPUTS

  //#region OP SCROLL
  @ViewChild('op', { static: false }) op!: OverlayPanel;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.op.hide();
  }
  //#endregion OP SCROLL

}
