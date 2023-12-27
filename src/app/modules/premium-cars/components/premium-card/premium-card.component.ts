import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, tap } from 'rxjs';
import {
  IPREMIUM_CAR,
  IPROPERTY_TYPE,
} from 'src/app/modules/premium-cars/models/premium-cars.models';
import { ITOAST_OBJECT } from '../../../../shared/models/toast-shared.models';
import { PremiumCarDetailedComponent } from '../premium-car-detailed/premium-car-detailed.component';
import {
  CAR_PROPERTY_SUBJECT,
  DcPremiumCarDetailedService,
  isCarProperty,
} from '../premium-car-detailed/premium-car-detailed.service';
import { PremiumCardService } from './premium-cars.service';

@Component({
  selector: 'premium-card',
  standalone: true,
  templateUrl: './premium-card.component.html',
  styleUrls: ['./premium-card.component.scss'],
  imports: [CommonModule],
  providers: [DialogService],
})
export class PremiumCardComponent {
  //#region INPUTS
  @Input() car!: IPREMIUM_CAR;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() triggerToast = new EventEmitter<ITOAST_OBJECT>();
  //#endregion OUTPUTS

  public carProperty$ = this.dcPremiumCarDetailedService.carProperty$.pipe(
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
    private premiumCardService: PremiumCardService,
    private dcPremiumCarDetailedService: DcPremiumCarDetailedService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  public addCar(propertyType: IPROPERTY_TYPE) {
    this.premiumCardService.addCarToUser(this.car.id, propertyType).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (propertyType.hasCar) {
            this.dcPremiumCarDetailedService.carPropertySubject.next('');
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
    this.premiumCardService.removeCarFromUser(this.car.id).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (this.car.has_car) {
            this.car.has_car = false;
            this.dcPremiumCarDetailedService.carPropertySubject.next('');
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
      width = '60%';
    } else if (innerWidth <= 1630) {
      width = '50%';
    } else width = '40%';
    const ref = this.dialogService.open(PremiumCarDetailedComponent, {
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
