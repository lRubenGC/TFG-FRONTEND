import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUSER_DATA } from 'src/app/modules/auth/models/auth.models';
import { IUSER_CARS_NUMBERS } from '../../models/user.models';

@Component({
  selector: 'user-header-card',
  templateUrl: './user-header-card.component.html',
  styleUrls: ['./user-header-card.component.scss'],
})
export class UserHeaderCardComponent {
  @Input() userData!: IUSER_DATA;
  @Input() userCarsNumbers!: IUSER_CARS_NUMBERS;
  @Output() exportCollectionClicked = new EventEmitter<void>();
}
