import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  lastValueFrom,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import {
  getBasicInnerWidth,
  getPremiumInnerWidth,
} from 'src/app/shared/functions/queryParams';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { USER_DATA } from '../../auth/models/auth.models';
import { BasicCarDetailedComponent } from '../../basic-cars/components/basic-car-detailed/basic-car-detailed.component';
import { BasicCarsService } from '../../basic-cars/services/basic-cars.service';
import { PremiumCarDetailedComponent } from '../../premium-cars/components/premium-car-detailed/premium-car-detailed.component';
import { PremiumCarsService } from '../../premium-cars/services/premium-cars.service';
import {
  SEARCH_CARS_FILTERS_OPTIONS,
  SEARCH_CARS_ORDER_OPTIONS,
  SEARCH_TYPE_OPTIONS,
} from '../models/search-results.constants';
import {
  CAR_TYPE,
  SEARCH_CARS_FILTERS,
  SEARCH_CARS_ORDER,
  SEARCH_CARS_RESPONSE,
  SEARCH_TYPE,
  YEAR_TYPE,
} from '../models/search-results.models';
import { SearchResultsService } from '../services/search-results.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsPage implements OnInit {
  //#region CAR TYPE FILTER
  public readonly SEARCH_TYPE_OPTIONS = SEARCH_TYPE_OPTIONS;
  public searchType = new BehaviorSubject<SEARCH_TYPE>('cars');
  private searchType$ = this.searchType.pipe(map((search_type) => search_type));
  //#endregion CAR TYPE FILTER

  //#region CAR TYPE FILTER
  public readonly CAR_TYPE_FILTER_OPTIONS = SEARCH_CARS_FILTERS_OPTIONS;
  public carTypeFilter = new BehaviorSubject<CAR_TYPE>('all');
  private carTypeFilter$ = this.carTypeFilter.pipe(map((car_type) => car_type));
  //#endregion CAR TYPE FILTER

  //#region ORDER
  public readonly ORDER_OPTIONS = SEARCH_CARS_ORDER_OPTIONS;
  public carOrder = new BehaviorSubject<YEAR_TYPE>('DATE_DESC');
  private carOrder$ = this.carOrder.pipe(map((order) => order));
  //#endregion ORDER

  //#region CARS VM
  public carsVM$: Observable<SEARCH_CARS_RESPONSE> = combineLatest([
    this.searchType$,
    this.route.params,
    this.carTypeFilter$,
    this.carOrder$,
  ]).pipe(
    filter(([search_type]) => search_type === 'cars'),
    switchMap(([search_type, params, car_type, year]) => {
      if (params && car_type && year) {
        const filters: SEARCH_CARS_FILTERS = {
          car_type,
        };
        const order: SEARCH_CARS_ORDER = {
          year,
        };

        return this.getCars(params['query'], filters, order);
      } else return of();
    })
  );
  //#endregion CARS VM

  //#region USERS VM
  public usersVM$: Observable<USER_DATA[]> = combineLatest([
    this.searchType$,
    this.route.params,
  ]).pipe(
    filter(([search_type]) => search_type === 'users'),
    switchMap(([search_type, params]) => this.getUsers(params['query']))
  );
  //#endregion USERS VM

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private searchResultsService: SearchResultsService,
    private translate: TranslateService,
    private router: Router,
    private dialogService: DialogService,
    private basicCarsService: BasicCarsService,
    private premiumCarsService: PremiumCarsService
  ) {}
  ngOnInit(): void {
    this.manageInit();
  }

  private getCars(
    model_name: string,
    car_type: SEARCH_CARS_FILTERS,
    order: SEARCH_CARS_ORDER
  ): Observable<SEARCH_CARS_RESPONSE> {
    return this.searchResultsService
      .getCars(model_name, car_type, order)
      .pipe(map((response) => response));
  }

  private getUsers(username: string): Observable<USER_DATA[]> {
    return this.searchResultsService
      .getUsers(username)
      .pipe(map((response) => response));
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

  public setCarTypeInRoute(carType: string) {
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
