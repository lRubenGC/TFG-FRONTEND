import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { BasicCarsResponse } from '../../models/basic-cars.models';
import { BasicCardComponent } from '../basic-card/basic-card.component';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';

@Component({
  selector: 'basic-cars-group',
  standalone: true,
  templateUrl: './basic-cars-group.component.html',
  styleUrls: ['./basic-cars-group.component.scss'],
  imports: [CommonModule, DcDividerComponent, BasicCardComponent],
})
export class BasicCarsGroupComponent {
  @Input() group!: BasicCarsResponse;
  @Output() triggerToast = new EventEmitter<ITOAST_OBJECT>();
}
