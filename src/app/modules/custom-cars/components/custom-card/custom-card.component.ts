import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { getBasicInnerWidth } from 'src/app/shared/functions/queryParams';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { ICUSTOM_CAR } from '../../models/custom-cars.models';
import { CustomCarsService } from '../../services/custom-cars.service';
import { CustomCarDetailedComponent } from '../custom-car-detailed/custom-car-detailed.component';

@Component({
  selector: 'custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    private dialogService: DialogService,
    private customCarsService: CustomCarsService
  ) {}

  upvoteCar(carId: number) {
    this.customCarsService.upvoteCar(carId).subscribe({
      next: (resp) => {
        if (resp.ok) {
          this.car.isVoted = true;
          this.car.upvotes++;
          this.triggerToast.emit({
            severity: 'success',
            summary: 'toast.success',
            detail: 'toast.car_upvoted',
          });
        }
      },
      error: (error) => {
        this.triggerToast.emit({
          severity: 'error',
          summary: 'toast.error',
          detail: 'toast.not_logged_in',
        });
      },
    });
  }

  downvoteCar(carId: number) {
    this.customCarsService.downvoteCar(carId).subscribe({
      next: (resp) => {
        if (resp.ok) {
          this.car.isVoted = false;
          this.car.upvotes--;
          this.triggerToast.emit({
            severity: 'success',
            summary: 'toast.success',
            detail: 'toast.car_downvoted',
          });
        }
      },
      error: (error) => {
        this.triggerToast.emit({
          severity: 'error',
          summary: 'toast.error',
          detail: 'toast.not_logged_in',
        });
      },
    });
  }

  public openModal() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { detailedCar: this.car.id },
      queryParamsHandling: 'merge',
    });

    const width = getBasicInnerWidth();
    const ref = this.dialogService.open(CustomCarDetailedComponent, {
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
