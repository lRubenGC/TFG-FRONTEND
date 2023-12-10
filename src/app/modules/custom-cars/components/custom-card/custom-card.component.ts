import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICUSTOM_CAR } from '../../models/custom-cars.models';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { DialogService } from 'primeng/dynamicdialog';
import { BasicCarDetailedComponent } from 'src/app/modules/basic-cars/components/basic-car-detailed/basic-car-detailed.component';

@Component({
  selector: 'custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CustomCardComponent {
  //#region INPUTS
  @Input() car!: ICUSTOM_CAR;
  @Input() isListView: boolean = true;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() triggerToast = new EventEmitter<ITOAST_OBJECT>();
  //#endregion OUTPUTS

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  voteCar() {}

  public openModal() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { detailedCar: this.car.id },
      queryParamsHandling: 'merge',
    });

    const innerWidth = window.innerWidth;
    let width;
    if (innerWidth <= 1230) {
      width = '90%';
    } else if (innerWidth <= 1440) {
      width = '75%';
    } else if (innerWidth <= 1630) {
      width = '60%';
    } else width = '50%';
    const ref = this.dialogService.open(BasicCarDetailedComponent, {
      data: {
        car: this.car,
      },
      header: this.car.model_name,
      width,
    });

    ref.onClose.subscribe(() => {
      this.removeDetailedCarFromUrl();
    });
  }

  private removeDetailedCarFromUrl() {
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    delete queryParams['detailedCar'];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }
}
