import { Component, Input } from '@angular/core';
import { USER_DATA } from 'src/app/modules/auth/models/auth.models';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user!: USER_DATA;
}
