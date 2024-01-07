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
  lastValueFrom,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { BasicCarsService } from 'src/app/modules/basic-cars/services/basic-cars.service';
import { CustomCarsService } from 'src/app/modules/custom-cars/services/custom-cars.service';
import { PremiumCarsService } from 'src/app/modules/premium-cars/services/premium-cars.service';
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
  public carTypeSubject = new BehaviorSubject<CAR_TYPE>('basic');
  public carType$ = this.carTypeSubject.pipe(
    map((car_type) => car_type),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );
  public readonly CAR_OWNERSHIP_OPTIONS = CAR_OWNERSHIP_OPTIONS;
  public carOwnershipSubject = new BehaviorSubject<CAR_OWNERSHIP>('owned');
  public carOwnership$ = this.carOwnershipSubject.pipe(
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
    tap((mainFilterOptions) => this.basicMainFilter$.next(mainFilterOptions[0]))
  );
  public basicSecondaryFilter$ = new Subject<string>();
  public basicSecondaryFilterOptions = this.basicMainFilter$.pipe(
    withLatestFrom(this.userVM$),
    switchMap(([mainFilter, { userData }]) =>
      this.userService.getSecondaryFilters(userData.id, 'basic', mainFilter)
    ),
    tap((secondaryFilterOptions) =>
      this.basicSecondaryFilter$.next(secondaryFilterOptions[0])
    )
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
    )
  );
  public premiumSecondaryFilter$ = new Subject<string>();
  public premiumSecondaryFilterOptions = this.premiumMainFilter$.pipe(
    withLatestFrom(this.userVM$),
    switchMap(([mainFilter, { userData }]) =>
      this.userService.getSecondaryFilters(userData.id, 'premium', mainFilter)
    )
  );
  //#endregion PREMIUM FILTERS

  //#region BASIC CARS VM
  public basicCarsVM$ = combineLatest(
    this.carOwnership$,
    this.userVM$,
    this.basicMainFilter$,
    this.basicSecondaryFilter$
  ).pipe(
    switchMap(([carOwnership, { userData }, year, mainSerie]) =>
      this.userService
        .getUserBasicCars(userData.id, year, mainSerie, carOwnership)
        .pipe(tap((a) => console.log(a)))
    )
  );
  //#endregion BASIC CARS VM

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
  ) {}

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
