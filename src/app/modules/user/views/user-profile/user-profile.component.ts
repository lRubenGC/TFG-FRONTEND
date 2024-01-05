import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  Observable,
  lastValueFrom,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { CustomCarDetailedComponent } from 'src/app/modules/custom-cars/components/custom-car-detailed/custom-car-detailed.component';
import { ICUSTOM_CAR } from 'src/app/modules/custom-cars/models/custom-cars.models';
import { CustomCarsService } from 'src/app/modules/custom-cars/services/custom-cars.service';
import { getBasicInnerWidth } from 'src/app/shared/functions/queryParams';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileView implements OnInit {
  // //#region ORDER CARS
  // public orderCarsSubject = new BehaviorSubject<CUSTOM_CARS_ORDER_TYPE>(
  //   'DATE_DESC'
  // );
  // public orderCarsOptions: CUSTOM_CARS_ORDER_TYPE[] = CUSTOM_CARS_ORDER;
  // //#endregion ORDER CARS

  // //#region CUSTOM CARS VM
  // // private customCarsSubject = new BehaviorSubject<ICUSTOM_CAR[]>([]);
  // public customCarsVM$: Observable<ICUSTOM_CAR[]> = this.orderCarsSubject.pipe(
  //   switchMap((order) => (order ? this.getCustomCars(order) : of([])))
  // );
  // //#endregion CUSTOM CARS VM

  ngOnInit(): void {
    this.manageInit();
  }

  constructor(
    private customCarsService: CustomCarsService,
    private messageService: MessageService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  private manageInit() {
    this.route.queryParams.pipe(take(1)).subscribe(async (params) => {
      const { detailedCar } = params;
      if (detailedCar) {
        this.customCarsService.getCarById(detailedCar).subscribe((resp) => {
          const width = getBasicInnerWidth();
          const ref = this.dialogService.open(CustomCarDetailedComponent, {
            data: {
              car: resp.car,
            },
            header: resp.car.model_name,
            width,
          });

          ref.onClose.subscribe(() => {
            this.removeDetailedCarFromUrl();
          });
        });
      }
    });
  }

  private removeDetailedCarFromUrl() {
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    delete queryParams['detailedCar'];
    delete queryParams['carType'];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  private getCustomCars(): Observable<ICUSTOM_CAR[]> {
    return this.customCarsService
      .getCarsList('DATE_ASC')
      .pipe(map((response) => response));
  }

  public async showToast(toastObject: ITOAST_OBJECT) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    const detail = await lastValueFrom(detailT);

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary,
      detail,
      life: 2000,
    });
  }

  public goToUploadCar(): void {
    this.router.navigate(['custom-cars/upload']);
  }
}
