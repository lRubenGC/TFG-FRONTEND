import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'dc-button',
  standalone: true,
  templateUrl: './dc-button.component.html',
  styleUrls: ['./dc-button.component.css'],
  imports: [CommonModule, TranslateModule],
})
export class DCButtonComponent {
  @Input() buttonTitle: string = '';
  @Input() buttonDisabled?: boolean = false;
  @Input() class: string = '';

  @Output() onClickButton = new EventEmitter<void>();
}
