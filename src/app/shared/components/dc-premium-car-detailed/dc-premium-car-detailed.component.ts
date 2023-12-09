import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import {
  IPREMIUM_CAR,
  IPROPERTY_TYPE,
} from 'src/app/modules/premium-cars/models/premium-cars.models';
import { ITOAST_OBJECT } from '../../models/toast-shared.models';
import { PremiumCardService } from '../dc-premium-card/dc-premium-cars.service';
import { DcPremiumCarDetailedService } from './dc-premium-car-detailed.service';

@Component({
  selector: 'dc-premium-car-detailed',
  standalone: true,
  templateUrl: './dc-premium-car-detailed.component.html',
  styleUrls: ['./dc-premium-car-detailed.component.scss'],
  imports: [CommonModule, TranslateModule],
})
export class DcPremiumCarDetailedComponent implements OnInit {
  public car!: IPREMIUM_CAR;

  constructor(
    private dcPremiumCarDetailedService: DcPremiumCarDetailedService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private premiumCardService: PremiumCardService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.car = this.config.data.car;
  }

  public addCar(propertyType: IPROPERTY_TYPE) {
    this.premiumCardService.addCarToUser(this.car.id, propertyType).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (propertyType.hasCar) {
            this.dcPremiumCarDetailedService.updateCarProperty(
              'has_car',
              this.car.id
            );
            this.car.has_car = true;
            this.car.wants_car = false;

            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_added_collection',
            });
          }
          if (propertyType.wantsCar) {
            this.dcPremiumCarDetailedService.updateCarProperty(
              'wants_car',
              this.car.id
            );
            this.car.wants_car = true;
            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_added_wishlist',
            });
          }
        } else {
          this.showToast({
            severity: 'error',
            summary: 'toast.error',
            detail: 'toast.not_logged_in',
          });
        }
      },
      error: (error) => {},
    });
  }

  public removeCar() {
    this.premiumCardService.removeCarFromUser(this.car.id).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (this.car.has_car) {
            this.car.has_car = false;
            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_removed_collection',
            });
          }
          if (this.car.wants_car) {
            this.car.wants_car = false;
            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_removed_wishlist',
            });
          }
          this.dcPremiumCarDetailedService.updateCarProperty(
            'remove_car',
            this.car.id
          );
        } else {
          this.showToast({
            severity: 'error',
            summary: 'toast.error',
            detail: 'toast.not_logged_in',
          });
        }
      },
      error: (error) => {},
    });
  }

  public async showToast(toastObject: ITOAST_OBJECT) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    const detail = await lastValueFrom(detailT);

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary: summary,
      detail: detail,
      life: 1500
    });
  }

  public getSeriesIcon(num: number): string {
    return `assets/icons/series/${num}.webp`;
  }
}
