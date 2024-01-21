import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { PremiumCarsResponse } from '../../models/premium-cars.models';
import { PremiumCardComponent } from '../premium-card/premium-card.component';

@Component({
  selector: 'premium-cars-group',
  standalone: true,
  templateUrl: './premium-cars-group.component.html',
  styleUrls: ['./premium-cars-group.component.scss'],
  imports: [CommonModule, DcDividerComponent, PremiumCardComponent],
})
export class PremiumCarsGroupComponent {
  @Input() group!: PremiumCarsResponse;
  @Output() triggerToast = new EventEmitter<ITOAST_OBJECT>();
  @Output() triggerCarType = new EventEmitter<string>();
}
