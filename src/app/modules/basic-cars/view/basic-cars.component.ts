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
import { BasicCarDetailedComponent } from 'src/app/modules/basic-cars/components/basic-car-detailed/basic-car-detailed.component';
import { DcBasicCarDetailedService } from 'src/app/modules/basic-cars/components/basic-car-detailed/basic-car-detailed.service';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { PROPERTY_FILTER_OPTIONS } from '../models/basic-cars.constants';
import {
  BasicCarsResponse,
  IOWNED_CARS,
  USER_PROPERTY,
  isUserProperty,
  owned_cars,
} from '../models/basic-cars.models';
import { BasicCarsService } from '../services/basic-cars.service';

@Component({
  selector: 'basic-cars',
  templateUrl: './basic-cars.component.html',
  styleUrls: ['./basic-cars.component.scss'],
})
export class BasicCarsPage implements OnInit {
  //#region YEAR FILTER
  private yearStoraged: string | null = null;
  public yearFilterSubject = new BehaviorSubject<string>('');
  public yearFilterOptions$: Observable<string[]> = this.basicCarsService
    .getAvailableYears()
    .pipe(
      tap((years) => {
        if (this.yearStoraged) {
          this.yearFilterSubject.next(this.yearStoraged);
        } else if (years) {
          this.yearFilterSubject.next(years[0]);
        }
      })
    );
  //#endregion YEAR FILTER

  //#region SERIES FILTER
  public seriesFilterSubject = new BehaviorSubject<string>('');
  public seriesFilterOptions$: Observable<string[]> =
    this.yearFilterSubject.pipe(
      switchMap((year) =>
        year ? this.basicCarsService.getAvailableSeries(year) : of([])
      ),
      tap((series) => {
        if (series.length) {
          this.seriesFilterSubject.next(series[0]);
        }
      })
    );
  //#endregion SERIES FILTER

  //#region PROPERTY FILTER
  public propertyFilterSubject = new BehaviorSubject<USER_PROPERTY>(
    USER_PROPERTY.ALL
  );
  public propertyFilterOptions = PROPERTY_FILTER_OPTIONS;
  //#endregion PROPERTY FILTER

  //#region OWNED CARS NUMBERED
  public ownedCars$: Observable<IOWNED_CARS> = combineLatest([
    this.yearFilterSubject,
    this.dcBasicCarDetailedService.carPropertySubject,
  ]).pipe(
    switchMap(([year, _]) =>
      year ? this.basicCarsService.getOwnedCars(year) : of(new owned_cars())
    )
  );
  //#endregion OWNED CARS NUMBERED

  //#region CARS VM
  public carsVM$: Observable<BasicCarsResponse[]> = combineLatest([
    this.yearFilterSubject,
    this.seriesFilterSubject,
    this.propertyFilterSubject,
  ]).pipe(
    debounceTime(100),
    tap(([year]) => {
      localStorage.setItem('b-yearStoraged', year);
    }),
    switchMap(([year, serie, property]) =>
      year && serie && property
        ? this.getBasicCars(year, serie, property)
        : of([])
    )
  );
  //#endregion CARS VM

  constructor(
    private route: ActivatedRoute,
    private basicCarsService: BasicCarsService,
    private dcBasicCarDetailedService: DcBasicCarDetailedService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.manageInit();
  }

  private getBasicCars(
    year: string,
    mainSerie: string,
    userProperty: USER_PROPERTY
  ): Observable<BasicCarsResponse[]> {
    return this.basicCarsService
      .getCarsByYear(year, { mainSerie, userProperty })
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
        this.basicCarsService.getCarById(detailedCar).subscribe((resp) => {
          this.yearStoraged = resp.year;
          const innerWidth = window.innerWidth;
          let width;
          if (innerWidth <= 1230) {
            width = '90%';
          } else if (innerWidth <= 1440) {
            width = '75%';
          } else if (innerWidth <= 1630) {
            width = '60%';
          } else width = '50%';
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
      } else {
        // Year storaged in localStorage
        const yearStoraged = localStorage.getItem('b-yearStoraged');
        if (yearStoraged) this.yearStoraged = yearStoraged;
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
