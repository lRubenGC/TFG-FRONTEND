import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import {
  IBASIC_CAR,
  IPROPERTY_TYPE,
} from 'src/app/modules/basic-cars/models/basic-cars.models';
import { ITOAST_OBJECT } from '../../../../shared/models/toast-shared.models';
import { BasicCarsService } from '../basic-card/basic-cars.service';
import { DcBasicCarDetailedService } from './basic-car-detailed.service';

@Component({
  selector: 'basic-car-detailed',
  standalone: true,
  templateUrl: './basic-car-detailed.component.html',
  styleUrls: ['./basic-car-detailed.component.scss'],
  imports: [CommonModule, TranslateModule],
})
export class BasicCarDetailedComponent implements OnInit {
  public car!: IBASIC_CAR;

  constructor(
    private dcBasicCarDetailedService: DcBasicCarDetailedService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private basicCarsSharedService: BasicCarsService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.car = this.config.data.car;
  }

  public addCar(propertyType: IPROPERTY_TYPE) {
    this.basicCarsSharedService
      .addCarToUser(this.car.id, propertyType)
      .subscribe({
        next: (resp) => {
          if (resp.ok) {
            if (propertyType.hasCar) {
              this.dcBasicCarDetailedService.updateCarProperty(
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
              this.car.wants_car = true;
              this.showToast({
                severity: 'success',
                summary: 'toast.success',
                detail: 'toast.car_added_wishlist',
              });
            }
          }
        },
        error: (error) => {
          this.showToast({
            severity: 'error',
            summary: 'toast.error',
            detail: 'toast.not_logged_in',
          });
        },
      });
  }

  public removeCar() {
    this.basicCarsSharedService.removeCarFromUser(this.car.id).subscribe({
      next: (resp) => {
        if (resp.ok) {
          if (this.car.has_car) {
            this.car.has_car = false;
            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_removed_collection',
            });
            this.dcBasicCarDetailedService.updateCarProperty(
              'remove_car',
              this.car.id
            );
          }
          if (this.car.wants_car) {
            this.car.wants_car = false;
            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_removed_wishlist',
            });
          }
        }
      },
      error: (error) => {
        this.showToast({
          severity: 'error',
          summary: 'toast.error',
          detail: 'toast.not_logged_in',
        });
      },
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
      life: 1500,
    });
  }

  public getSeriesIcon(num: number): string {
    return `assets/icons/series/${num}.webp`;
  }
}
