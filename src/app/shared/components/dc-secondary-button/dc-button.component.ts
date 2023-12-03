import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'dc-button',
  standalone: true,
  templateUrl: './dc-button.component.html',
  styleUrls: ['./dc-button.component.css'],
  imports: [TranslateModule],
})
export class DCButtonComponent {
  @Input() buttonTitle: string = '';
  @Input() buttonDisabled: boolean = false;
}
