import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  lastValueFrom,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { PremiumCarDetailedComponent } from 'src/app/modules/premium-cars/components/premium-car-detailed/premium-car-detailed.component';
import { DcPremiumCarDetailedService } from 'src/app/modules/premium-cars/components/premium-car-detailed/premium-car-detailed.service';
import { getPremiumInnerWidth } from 'src/app/shared/functions/queryParams';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { PROPERTY_FILTER_OPTIONS } from '../models/premium-cars.constants';
import {
  IOWNED_CARS,
  PremiumCarsResponse,
  USER_PROPERTY,
  isUserProperty,
  owned_cars,
} from '../models/premium-cars.models';
import { PremiumCarsService } from '../services/premium-cars.service';

@Component({
  selector: 'premium-cars',
  templateUrl: './premium-cars.component.html',
  styleUrls: ['./premium-cars.component.scss'],
})
export class PremiumCarsPage implements OnInit {
  //#region MAIN SERIE FILTER
  private mainSerieStoraged: string | null = null;
  public mainSerieFilterSubject = new BehaviorSubject<string>('');
  public mainSerieFilterOptions$: Observable<string[]> = this.premiumCarsService
    .getAvailableMainSeries()
    .pipe(
      tap((series) => {
        if (this.mainSerieStoraged) {
          this.mainSerieFilterSubject.next(this.mainSerieStoraged);
        } else if (series) {
          this.mainSerieFilterSubject.next(series[0]);
        }
      })
    );
  //#endregion MAIN SERIE FILTER

  //#region SECONDARY SERIES FILTER
  public secondarySerieFilterSubject = new BehaviorSubject<string>('');
  public secondarySerieFilterOptions$: Observable<string[]> =
    this.mainSerieFilterSubject.pipe(
      switchMap((serie) =>
        serie
          ? this.premiumCarsService.getAvailableSecondarySeries(serie)
          : of([])
      ),
      tap((series) => {
        if (series.length) {
          this.secondarySerieFilterSubject.next(series[0]);
        }
      })
    );
  //#endregion SECONDARY SERIES FILTER

  //#region PROPERTY FILTER
  public propertyFilterSubject = new BehaviorSubject<USER_PROPERTY>(
    USER_PROPERTY.ALL
  );
  public propertyFilterOptions = PROPERTY_FILTER_OPTIONS;
  //#endregion PROPERTY FILTER

  //#region OWNED CARS NUMBERED
  public ownedCars$: Observable<IOWNED_CARS> = combineLatest([
    this.mainSerieFilterSubject,
    this.premiumCarDetailedService.carPropertySubject,
  ]).pipe(
    switchMap(([year]) =>
      year ? this.premiumCarsService.getOwnedCars(year) : of(new owned_cars())
    )
  );
  //#endregion OWNED CARS NUMBERED

  //#region CARS VM
  public carsVM$: Observable<PremiumCarsResponse[]> = combineLatest([
    this.mainSerieFilterSubject,
    this.secondarySerieFilterSubject,
    this.propertyFilterSubject,
  ]).pipe(
    debounceTime(100),
    tap(([mainSerie]) => {
      localStorage.setItem('p-mainSerieStoraged', mainSerie);
    }),
    switchMap(([mainSerie, secondarySerie, property]) =>
      mainSerie && secondarySerie && property
        ? this.getPremiumCars(mainSerie, secondarySerie, property)
        : of([])
    )
  );
  //#endregion CARS VM

  constructor(
    private route: ActivatedRoute,
    private premiumCarsService: PremiumCarsService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private premiumCarDetailedService: DcPremiumCarDetailedService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.manageInit();
  }

  private getPremiumCars(
    year: string,
    secondarySerie: string,
    userProperty: USER_PROPERTY
  ): Observable<PremiumCarsResponse[]> {
    return this.premiumCarsService
      .getCarsByMainSerie(year, { secondarySerie, userProperty })
      .pipe(map((response) => response));
  }

  public onPropertySelected(userProperty: string): void {
    if (isUserProperty(userProperty)) {
      this.propertyFilterSubject.next(userProperty);
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
      summary,
      detail,
      life: 2000,
    });
  }

  private manageInit() {
    this.route.queryParams.pipe(take(1)).subscribe(async (params) => {
      const { detailedCar } = params;
      if (detailedCar) {
        this.premiumCarsService.getCarById(detailedCar).subscribe((resp) => {
          this.mainSerieStoraged = resp.car.main_serie;
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
      } else {
        // Main serie storaged in localStorage
        const mainSerieStoraged = localStorage.getItem('p-mainSerieStoraged');
        if (mainSerieStoraged) this.mainSerieStoraged = mainSerieStoraged;
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
}
