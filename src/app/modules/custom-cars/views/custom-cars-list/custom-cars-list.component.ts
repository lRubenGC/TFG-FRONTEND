import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  Observable,
  lastValueFrom,
  map,
  of,
  switchMap,
} from 'rxjs';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
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
export class CustomCarsListView {
  //#region ORDER CARS
  public orderCarsSubject = new BehaviorSubject<CUSTOM_CARS_ORDER_TYPE>('DATE_DESC');
  public orderCarsOptions: CUSTOM_CARS_ORDER_TYPE[] = CUSTOM_CARS_ORDER;
  //#endregion ORDER CARS

  //#region CUSTOM CARS VM
  // private customCarsSubject = new BehaviorSubject<ICUSTOM_CAR[]>([]);
  public customCarsVM$: Observable<ICUSTOM_CAR[]> = this.orderCarsSubject.pipe(
    switchMap((order) => (order ? this.getCustomCars(order) : of([])))
  );
  //#endregion CUSTOM CARS VM

  constructor(
    private customCarsService: CustomCarsService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

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
}
