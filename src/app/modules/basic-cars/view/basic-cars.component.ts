import { Component, OnInit } from '@angular/core';
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
export class BasicCarsView implements OnInit {
  //#region YEAR FILTER
  private yearFromQueryParams: string | null = '';
  public yearFilterSubject = new BehaviorSubject<string>('');
  public yearFilterOptions$: Observable<string[]> = this.basicCarsService
    .getAvailableYears()
    .pipe(
      tap((years) => {
        if (
          this.yearFromQueryParams &&
          years &&
          years.includes(this.yearFromQueryParams)
        ) {
          this.yearFilterSubject.next(this.yearFromQueryParams);
          this.yearFromQueryParams = null;
        } else if (years) {
          this.yearFilterSubject.next(years[0]);
        }
      })
    );
  //#endregion YEAR FILTER

  //#region SERIES FILTER
  private seriesFromQueryParams: string | null = '';
  public seriesFilterSubject = new BehaviorSubject<string>('');
  public seriesFilterOptions$: Observable<string[]> =
    this.yearFilterSubject.pipe(
      switchMap((year) =>
        year ? this.basicCarsService.getAvailableSeries(year) : of([])
      ),
      tap((series) => {
        if (
          this.seriesFromQueryParams &&
          series &&
          series.includes(this.seriesFromQueryParams)
        ) {
          this.seriesFilterSubject.next(this.seriesFromQueryParams);
          this.seriesFromQueryParams = null;
        } else if (series) {
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

  //#region CARS VM
  public carsVM$: Observable<BasicCarsResponse[]> = combineLatest([
    this.yearFilterSubject,
    this.seriesFilterSubject,
    this.propertyFilterSubject,
  ]).pipe(
    tap(([year, series, property]) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { year, series },
        queryParamsHandling: 'merge',
      });
    }),
    switchMap(([year, serie, property]) =>
      year && serie && property
        ? this.getBasicCars(year, serie, property)
        : of([])
    )
  );
  //#endregion CARS VM

  constructor(
    private basicCarsService: BasicCarsService,
    private messageService: MessageService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { year, series, property } = params;
      if (year) this.yearFromQueryParams = year;
      if (series) this.seriesFromQueryParams = series;
    });
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
      summary: summary,
      detail: detail,
    });
  }
}
