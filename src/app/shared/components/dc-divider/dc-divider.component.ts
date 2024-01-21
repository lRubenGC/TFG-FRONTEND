import { Component, Input } from '@angular/core';

@Component({
  selector: 'dc-divider',
  standalone: true,
  templateUrl: './dc-divider.component.html',
  styleUrls: ['./dc-divider.component.scss'],
})
export class DcDividerComponent {
  @Input() backgroundColor: string = 'var(--grey-500)';
  @Input() opacity: string = '1';
}
