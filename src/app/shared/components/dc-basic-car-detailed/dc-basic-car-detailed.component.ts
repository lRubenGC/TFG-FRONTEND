import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { decodeToken } from '../../functions/token-functions';
import {
  IBASIC_CAR,
  IPROPERTY_TYPE,
} from '../../models/basic-cars-shared.models';
import { ITOAST_OBJECT } from '../../models/toast-shared.models';
import { userIdToken } from '../../models/token-shared.models';
import { BasicCarsSharedService } from '../../services/basic-cars-shared.service';
import { DcBasicCarDetailedService } from './dc-basic-car-detailed.service';

@Component({
  selector: 'dc-basic-car-detailed',
  standalone: true,
  templateUrl: './dc-basic-car-detailed.component.html',
  styleUrls: ['./dc-basic-car-detailed.component.scss'],
  imports: [CommonModule, TranslateModule],
})
export class DcBasicCarDetailedComponent implements OnInit {
  public car!: IBASIC_CAR;

  constructor(
    private dcBasicCarDetailedService: DcBasicCarDetailedService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private basicCarsSharedService: BasicCarsSharedService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  //#region PROPS
  private userToken: userIdToken = { hasToken: false };
  //#endregion PROPS

  async ngOnInit() {
    this.car = this.config.data.car;
    this.userToken = await decodeToken();
  }

  public addCar(propertyType: IPROPERTY_TYPE) {
    if (this.userToken.userId) {
      this.basicCarsSharedService
        .addCarToUser(this.userToken.userId, this.car.id, propertyType)
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
                this.dcBasicCarDetailedService.updateCarProperty(
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
            }
          },
          error: (error) => {},
        });
    }
  }

  public removeCar() {
    if (this.userToken.userId) {
      this.basicCarsSharedService
        .removeCarFromUser(this.userToken.userId, this.car.id)
        .subscribe({
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
              this.dcBasicCarDetailedService.updateCarProperty(
                'remove_car',
                this.car.id
              );
            }
          },
          error: (error) => {},
        });
    }
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
    });
  }
}
