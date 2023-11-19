import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IBasicCar } from 'src/app/modules/basic-cars/models/basic-cars.models';

@Component({
  selector: 'dc-basic-card',
  standalone: true,
  templateUrl: './dc-basic-card.component.html',
  styleUrls: ['./dc-basic-card.component.scss'],
  imports: [CommonModule],
})
export class DcBasicCardComponent {
  @Input() car!: IBasicCar;
}
