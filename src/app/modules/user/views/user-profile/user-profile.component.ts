import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  lastValueFrom,
  map,
  merge,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { BasicCarDetailedComponent } from 'src/app/modules/basic-cars/components/basic-car-detailed/basic-car-detailed.component';
import { BasicCarsResponse } from 'src/app/modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from 'src/app/modules/basic-cars/services/basic-cars.service';
import { CustomCarDetailedComponent } from 'src/app/modules/custom-cars/components/custom-car-detailed/custom-car-detailed.component';
import { ICUSTOM_CAR } from 'src/app/modules/custom-cars/models/custom-cars.models';
import { CustomCarsService } from 'src/app/modules/custom-cars/services/custom-cars.service';
import { PremiumCarDetailedComponent } from 'src/app/modules/premium-cars/components/premium-car-detailed/premium-car-detailed.component';
import { PremiumCarsResponse } from 'src/app/modules/premium-cars/models/premium-cars.models';
import { PremiumCarsService } from 'src/app/modules/premium-cars/services/premium-cars.service';
import { getPropStoraged } from 'src/app/shared/functions/localStorage';
import {
  getBasicInnerWidth,
  getPremiumInnerWidth,
} from 'src/app/shared/functions/queryParams';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import {
  CAR_OWNERSHIP_OPTIONS,
  CAR_TYPE_OPTIONS,
} from '../../models/user.constants';
import { CAR_OWNERSHIP, CAR_TYPE, USER_VM } from '../../models/user.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileView {
  //#region USER DATA
  public userVM$: Observable<USER_VM> = this.route.params.pipe(
    switchMap(({ username }) =>
      this.userService
        .getUserData(username)
        .pipe(
          switchMap((userData) =>
            this.userService
              .getUserNumbers(userData.id)
              .pipe(map((userNumbers) => ({ userData, userNumbers })))
          )
        )
    ),
    map((userVM) => {
      const userVisitorId = Number(localStorage.getItem('userId'));
      return {
        ...userVM,
        userVisitorId: userVisitorId,
      };
    }),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion USER DATA

  //#region SLIDE MENU
  public readonly CAR_TYPE_OPTIONS = CAR_TYPE_OPTIONS;
  public carTypeSubject = new BehaviorSubject<CAR_TYPE>(
    getPropStoraged<CAR_TYPE>('up-carTypeStoraged', 'basic')
  );
  public carType$ = this.carTypeSubject.pipe(
    tap((car_type) => localStorage.setItem('up-carTypeStoraged', car_type)),
    map((car_type) => car_type),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  public readonly CAR_OWNERSHIP_OPTIONS = CAR_OWNERSHIP_OPTIONS;
  public carOwnershipSubject = new BehaviorSubject<CAR_OWNERSHIP>(
    getPropStoraged<CAR_OWNERSHIP>('up-carOwnershipStoraged', 'owned')
  );
  public carOwnership$ = this.carOwnershipSubject.pipe(
    tap((car_ownership) =>
      localStorage.setItem('up-carOwnershipStoraged', car_ownership)
    ),
    map((car_ownership) => car_ownership),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion SLIDE MENU

  //#region BASIC FILTERS
  public basicMainFilter$ = new Subject<string>();
  public basicMainFilterOptions = this.userVM$.pipe(
    switchMap(({ userData }) =>
      this.userService.getMainFilters(userData.id, 'basic')
    ),
    tap((mainFilterOptions) =>
      this.basicMainFilter$.next(mainFilterOptions[0])
    ),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  public basicSecondaryFilter$ = new Subject<string>();
  public basicSecondaryFilterOptions = this.basicMainFilter$.pipe(
    filter((series) => !!series),
    withLatestFrom(this.userVM$),
    switchMap(([mainFilter, { userData }]) =>
      this.userService.getSecondaryFilters(userData.id, 'basic', mainFilter)
    ),
    tap((secondaryFilterOptions) =>
      this.basicSecondaryFilter$.next(secondaryFilterOptions[0])
    ),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion BASIC FILTERS

  //#region PREMIUM FILTERS
  public premiumMainFilter$ = new Subject<string>();
  public premiumMainFilterOptions = this.userVM$.pipe(
    switchMap(({ userData }) =>
      this.userService.getMainFilters(userData.id, 'premium')
    ),
    tap((mainFilterOptions) =>
      this.premiumMainFilter$.next(mainFilterOptions[0])
    ),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  public premiumSecondaryFilter$ = new Subject<string>();
  public premiumSecondaryFilterOptions = this.premiumMainFilter$.pipe(
    filter((series) => !!series),
    withLatestFrom(this.userVM$),
    switchMap(([mainFilter, { userData }]) =>
      this.userService.getSecondaryFilters(userData.id, 'premium', mainFilter)
    ),
    tap((secondaryFilterOptions) =>
      this.premiumSecondaryFilter$.next(secondaryFilterOptions[0])
    ),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion PREMIUM FILTERS

  //#region BASIC CARS VM
  public basicCarsVM$: Observable<BasicCarsResponse[]> = combineLatest(
    this.carOwnership$.pipe(distinctUntilChanged()),
    this.basicMainFilter$.pipe(distinctUntilChanged()),
    this.basicSecondaryFilter$.pipe(distinctUntilChanged())
  ).pipe(
    debounceTime(100),
    withLatestFrom(this.userVM$),
    switchMap(([[carOwnership, year, mainSerie], { userData }]) =>
      this.userService.getUserBasicCars(
        userData.id,
        year,
        mainSerie,
        carOwnership
      )
    ),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion BASIC CARS VM

  //#region PREMIUM CARS VM
  public premiumCarsVM$: Observable<PremiumCarsResponse[]> = combineLatest(
    this.carOwnership$.pipe(distinctUntilChanged()),
    this.premiumMainFilter$.pipe(distinctUntilChanged()),
    this.premiumSecondaryFilter$.pipe(distinctUntilChanged())
  ).pipe(
    debounceTime(100),
    withLatestFrom(this.userVM$),
    switchMap(([[carOwnership, year, mainSerie], { userData }]) =>
      this.userService.getUserPremiumCars(
        userData.id,
        year,
        mainSerie,
        carOwnership
      )
    ),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion PREMIUM CARS VM

  //#region CUSTOM CARS VM
  public customCarsVM$: Observable<ICUSTOM_CAR[]> = this.userVM$.pipe(
    switchMap(({ userData }) => this.userService.getUserCustomCars(userData.id))
  );
  //#endregion CUSTOM CARS VM

  //#region LOADING
  public loading$ = merge(
    merge(
      this.basicMainFilter$,
      this.basicSecondaryFilter$,
      this.premiumMainFilter$,
      this.premiumSecondaryFilter$
    ).pipe(map(() => true)),
    merge(this.premiumCarsVM$, this.basicCarsVM$).pipe(map(() => false))
  ).pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  //#endregion LOADING

  constructor(
    private userService: UserService,
    private basicCarsService: BasicCarsService,
    private premiumCarsService: PremiumCarsService,
    private customCarsService: CustomCarsService,
    private messageService: MessageService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.manageInit();
  }

  public exportUserCollection(id: number) {
    this.userService.downloadUserCollection(id).catch((err) => {
      this.showToast({
        severity: 'error',
        summary: 'toast.error',
        detail: 'user.header.export_error',
      });
    });
  }

  private manageInit() {
    this.route.queryParams.pipe(take(1)).subscribe(async (params) => {
      const { detailedCar } = params;
      const { carType } = params;
      if (detailedCar) {
        if (carType && carType === 'basic') {
          this.basicCarsService.getCarById(detailedCar).subscribe((resp) => {
            const width = getBasicInnerWidth();
            const ref = this.dialogService.open(BasicCarDetailedComponent, {
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
        } else if (carType && carType === 'premium') {
          this.premiumCarsService.getCarById(detailedCar).subscribe((resp) => {
            const width = getPremiumInnerWidth();
            const ref = this.dialogService.open(PremiumCarDetailedComponent, {
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
        } else if (carType && carType === 'custom') {
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

  public setCarTypeInRoute(carType: String) {
    setTimeout(
      () =>
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { carType },
          queryParamsHandling: 'merge',
        }),
      1
    );
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
