import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { BasicCarsResponse, USER_PROPERTY, isUserProperty } from '../models/basic-cars.models';
import { BasicCarsService } from '../services/basic-cars.service';
import { PROPERTY_FILTER_OPTIONS } from '../models/basic-cars.constants';

@Component({
  selector: 'basic-cars',
  templateUrl: './basic-cars.component.html',
  styleUrls: ['./basic-cars.component.scss'],
})
export class BasicCarsView {
  //#region FILTERS
  public yearFilterSubject = new BehaviorSubject<string>('');
  public yearFilterOptions$: Observable<string[]> = this.basicCarsService
    .getAvailableYears()
    .pipe(
      tap((years) => (years ? this.yearFilterSubject.next(years[0]) : null))
    );

  public seriesFilterSubject = new BehaviorSubject<string>('');
  public seriesFilterOptions$: Observable<string[]> =
    this.yearFilterSubject.pipe(
      switchMap((year) =>
        year ? this.basicCarsService.getAvailableSeries(year) : of([])
      ),
      tap((series) =>
        series ? this.seriesFilterSubject.next(series[0]) : of([])
      )
    );

  public propertyFilterSubject = new BehaviorSubject<USER_PROPERTY>(USER_PROPERTY.ALL);
  public propertyFilterOptions = PROPERTY_FILTER_OPTIONS;
  //#endregion FILTERS

  //#region CARS VM
  public carsVM$: Observable<BasicCarsResponse[]> = combineLatest([
    this.yearFilterSubject,
    this.seriesFilterSubject,
    this.propertyFilterSubject
  ]).pipe(
    switchMap(([year, serie, property]) =>
      year && serie && property ? this.getBasicCars(year, serie, property) : of([])
    )
  );
  //#endregion CARS VM

  constructor(private basicCarsService: BasicCarsService) {}

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
}