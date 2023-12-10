import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, tap } from 'rxjs';
import {
  IBASIC_CAR,
  IPROPERTY_TYPE,
} from 'src/app/modules/basic-cars/models/basic-cars.models';
import { ITOAST_OBJECT } from '../../../../shared/models/toast-shared.models';
import { BasicCarDetailedComponent } from '../basic-car-detailed/basic-car-detailed.component';
import {
  CAR_PROPERTY_SUBJECT,
  DcBasicCarDetailedService,
  isCarProperty,
} from '../basic-car-detailed/basic-car-detailed.service';
import { BasicCarsService } from './basic-cars.service';

@Component({
  selector: 'basic-card',
  standalone: true,
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss'],
  imports: [CommonModule],
  providers: [DialogService],
})
export class BasicCardComponent {
  //#region INPUTS
  @Input() car!: IBASIC_CAR;
  @Input() showYear?: boolean = false;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() triggerToast = new EventEmitter<ITOAST_OBJECT>();
  //#endregion OUTPUTS

  public carProperty$ = this.dcBasicCarDetailedService.carProperty$.pipe(
    filter(
      (carPropertySubject): carPropertySubject is CAR_PROPERTY_SUBJECT =>
        isCarProperty(carPropertySubject) &&
        carPropertySubject.carId === this.car.id
    ),
    tap((carProperty) => {
      switch (carProperty.carId) {
        case 'has_car':
          this.car.has_car = true;
          this.car.wants_car = false;
          break;
        case 'wants_car':
          this.car.has_car = false;
          this.car.wants_car = true;
          break;
        case 'remove_car':
          this.car.has_car = false;
          this.car.wants_car = false;
      }
    })
  );

  constructor(
    private route: ActivatedRoute,
    private basicCarsService: BasicCarsService,
    private dcBasicCarDetailedService: DcBasicCarDetailedService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  public addCar(propertyType: IPROPERTY_TYPE) {
    this.basicCarsService.addCarToUser(this.car.id, propertyType).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (propertyType.hasCar) {
            this.dcBasicCarDetailedService.carPropertySubject.next('');
            this.car.has_car = true;
            this.car.wants_car = false;

            this.triggerToast.emit({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_added_collection',
            });
          }
          if (propertyType.wantsCar) {
            this.car.wants_car = true;
            this.triggerToast.emit({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_added_wishlist',
            });
          }
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

  public removeCar() {
    this.basicCarsService.removeCarFromUser(this.car.id).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (this.car.has_car) {
            this.car.has_car = false;
            this.dcBasicCarDetailedService.carPropertySubject.next('');
            this.triggerToast.emit({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_removed_collection',
            });
          }
          if (this.car.wants_car) {
            this.car.wants_car = false;
            this.triggerToast.emit({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_removed_wishlist',
            });
          }
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

  public getSeriesIcon(num: number): string {
    return `assets/icons/series/${num}.webp`;
  }
}
