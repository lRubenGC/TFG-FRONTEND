import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { decodeToken } from '../../functions/token-functions';
import {
  IBASIC_CAR,
  IPROPERTY_TYPE,
} from '../../models/basic-cars-shared.models';
import { ITOAST_OBJECT } from '../../models/toast-shared.models';
import { userIdToken } from '../../models/token-shared.models';
import { BasicCarsSharedService } from '../../services/basic-cars-shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DcBasicCarDetailedComponent } from '../dc-basic-car-detailed/dc-basic-car-detailed.component';

@Component({
  selector: 'dc-basic-card',
  standalone: true,
  templateUrl: './dc-basic-card.component.html',
  styleUrls: ['./dc-basic-card.component.scss'],
  imports: [CommonModule],
  providers: [DialogService],
})
export class DcBasicCardComponent implements OnInit {
  //#region INPUTS
  @Input() car!: IBASIC_CAR;
  @Input() showYear?: boolean = false;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() triggerToast = new EventEmitter<ITOAST_OBJECT>();
  //#endregion OUTPUTS

  //#region PROPS
  private userToken: userIdToken = { hasToken: false };
  //#endregion PROPS

  async ngOnInit() {
    this.userToken = await decodeToken();
  }

  constructor(
    private basicCarsSharedService: BasicCarsSharedService,
    private dialogService: DialogService
  ) {}

  public addCar(propertyType: IPROPERTY_TYPE) {
    if (this.userToken.userId) {
      this.basicCarsSharedService
        .addCarToUser(this.userToken.userId, this.car.id, propertyType)
        .subscribe({
          next: (resp) => {
            if (resp.ok) {
              if (propertyType.hasCar) {
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
          error: (error) => {},
        });
    }
  }

  public openModal() {
    const ref = this.dialogService.open(DcBasicCarDetailedComponent, {
      data: {
        car: this.car,
      },
      header: this.car.model_name,
      width: '50%'
    });
  }
}
