import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'dc-user-menu-button',
  standalone: true,
  templateUrl: './dc-user-menu-button.component.html',
  styleUrls: ['./dc-user-menu-button.component.scss'],
  imports: [RouterModule, TranslateModule, CommonModule],
})
export class DcUserMenuButtonComponent {
  @Input() type: string = '';
  @Input() text: string = '';
  @Input() link: string = '';
  @Input() linkObject?: string = '';
  @Input() icon: string = '';
}
