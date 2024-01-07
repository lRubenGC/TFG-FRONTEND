import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SLIDE_MENU_OPTIONS } from './slide-menu.models';

@Component({
  selector: 'slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent {
  @Input() options: SLIDE_MENU_OPTIONS[] = [];
  @Input() selected: string | null = '';
  @Output() optionSelected = new EventEmitter<any>();
}
