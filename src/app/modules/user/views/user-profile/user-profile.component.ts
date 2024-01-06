import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  Observable,
  lastValueFrom,
  map,
  merge,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs';
import { CustomCarsService } from 'src/app/modules/custom-cars/services/custom-cars.service';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { UserService } from '../../services/user.service';
import { IUSER_DATA } from 'src/app/modules/auth/models/auth.models';
import { IUSER_CARS_NUMBERS, USER_VM } from '../../models/user.models';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileView {
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

  //#region USER DATA
  public userVM$: Observable<USER_VM> = this.route.params.pipe(
    switchMap(({ username }) =>
      this.getUserData(username).pipe(
        switchMap((userData) =>
          this.getUserNumbers(userData.id).pipe(
            map((userNumbers) => ({ userData, userNumbers }))
          )
        )
      )
    )
  );
  //#endregion USER DATA

  constructor(
    private userService: UserService,
    private customCarsService: CustomCarsService,
    private messageService: MessageService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  private getUserData(username: string) {
    return this.userService.getUserData(username);
  }

  private getUserNumbers(id: number) {
    return this.userService.getUserNumbers(id);
  }

  // private getCustomCars(): Observable<ICUSTOM_CAR[]> {
  //   return this.customCarsService
  //     .getCarsList('DATE_ASC')
  //     .pipe(map((response) => response));
  // }

  public exportUserCollection(id: number) {
    this.userService.downloadUserCollection(id).catch((err) => {
      this.showToast({
        severity: 'error',
        summary: 'toast.error',
        detail: 'user.header.export_error',
      });
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
