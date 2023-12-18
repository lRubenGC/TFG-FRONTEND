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
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { CustomCarDetailedComponent } from '../../components/custom-car-detailed/custom-car-detailed.component';
import { CUSTOM_CARS_ORDER } from '../../models/custom-cars.constants';
import {
  CUSTOM_CARS_ORDER_TYPE,
  ICUSTOM_CAR,
} from '../../models/custom-cars.models';
import { CustomCarsService } from '../../services/custom-cars.service';

@Component({
  selector: 'custom-cars-list',
  templateUrl: './custom-cars-list.component.html',
  styleUrls: ['./custom-cars-list.component.scss'],
})
export class CustomCarsListView implements OnInit {
  //#region ORDER CARS
  public orderCarsSubject = new BehaviorSubject<CUSTOM_CARS_ORDER_TYPE>(
    'DATE_DESC'
  );
  public orderCarsOptions: CUSTOM_CARS_ORDER_TYPE[] = CUSTOM_CARS_ORDER;
  //#endregion ORDER CARS

  //#region CUSTOM CARS VM
  // private customCarsSubject = new BehaviorSubject<ICUSTOM_CAR[]>([]);
  public customCarsVM$: Observable<ICUSTOM_CAR[]> = this.orderCarsSubject.pipe(
    switchMap((order) => (order ? this.getCustomCars(order) : of([])))
  );
  //#endregion CUSTOM CARS VM

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
          const innerWidth = window.innerWidth;
          let width;
          if (innerWidth <= 1230) {
            width = '90%';
          } else if (innerWidth <= 1440) {
            width = '75%';
          } else if (innerWidth <= 1630) {
            width = '60%';
          } else width = '40%';
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

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  private getCustomCars(
    order: CUSTOM_CARS_ORDER_TYPE
  ): Observable<ICUSTOM_CAR[]> {
    return this.customCarsService
      .getCarsList(order)
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
