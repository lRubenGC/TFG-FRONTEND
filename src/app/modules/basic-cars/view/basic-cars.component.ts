import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  lastValueFrom,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { PROPERTY_FILTER_OPTIONS } from '../models/basic-cars.constants';
import {
  BasicCarsResponse,
  USER_PROPERTY,
  isUserProperty,
} from '../models/basic-cars.models';
import { BasicCarsService } from '../services/basic-cars.service';

@Component({
  selector: 'basic-cars',
  templateUrl: './basic-cars.component.html',
  styleUrls: ['./basic-cars.component.scss'],
})
export class BasicCarsView {
  //#region YEAR FILTER
  public yearFilterSubject = new BehaviorSubject<string>('');
  public yearFilterOptions$: Observable<string[]> = combineLatest([
    this.basicCarsService.getAvailableYears(),
    this.activatedRoute.queryParams,
  ]).pipe(
    tap(([years, queryParams]) => {
      if (queryParams['year']) {
        this.yearFilterSubject.next(queryParams['year']);
      } else if (years) {
        this.yearFilterSubject.next(years[0]);
      }
    }),
    map(([years]) => years)
  );
  //#endregion YEAR FILTER

  //#region SERIES FILTER
  public seriesFilterSubject = new BehaviorSubject<string>('');
  public seriesFilterOptions$: Observable<string[]> = combineLatest([
    this.yearFilterSubject,
    this.activatedRoute.queryParams,
  ]).pipe(
    switchMap(([year, queryParams]) =>
      year
        ? this.basicCarsService
            .getAvailableSeries(year)
            .pipe(map((series) => ({ series, queryParams })))
        : of({ series: [], queryParams })
    ),
    tap(({ series, queryParams }) => {
      if (queryParams['series']) {
        this.seriesFilterSubject.next(queryParams['series']);
      } else if (series) {
        this.seriesFilterSubject.next(series[0]);
      }
    }),
    map(({ series }) => series)
  );
  //#endregion SERIES FILTER

  //#region PROPERTY FILTER
  public propertyFilterSubject = new BehaviorSubject<USER_PROPERTY>(
    USER_PROPERTY.ALL
  );
  public propertyFilterOptions = this.activatedRoute.queryParams.pipe(
    tap((queryParams) => {
      if (queryParams['property']) {
        this.propertyFilterSubject.next(queryParams['property']);
      }
    }),
    map(() => PROPERTY_FILTER_OPTIONS)
  );
  //#endregion PROPERTY FILTER

  //#region CARS VM
  public carsVM$: Observable<BasicCarsResponse[]> = combineLatest([
    this.yearFilterSubject,
    this.seriesFilterSubject,
    this.propertyFilterSubject,
  ]).pipe(
    tap(([year, series, property]) => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { year, series, property },
        queryParamsHandling: 'merge',
      });
    }),
    switchMap(([year, series, property]) =>
      year && series && property
        ? this.getBasicCars(year, series, property)
        : of([])
    )
  );
  //#endregion CARS VM

  constructor(
    private activatedRoute: ActivatedRoute,
    private basicCarsService: BasicCarsService,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService
  ) {}

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
      summary: summary,
      detail: detail,
    });
  }
}
