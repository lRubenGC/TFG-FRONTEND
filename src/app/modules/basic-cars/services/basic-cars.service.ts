import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';

import { getTokenFromIndexedDB } from 'src/app/helpers/indexedDB';
import { environment } from 'src/environments/environment';
import {
  BasicCarsResponse,
  FiltersBody,
  GET_CAR_BY_ID_RESPONSE,
} from '../models/basic-cars.models';

@Injectable({
  providedIn: 'root',
})
export class BasicCarsService {
  constructor(private http: HttpClient) {}

  public getCarsByYear(
    year: string,
    filters?: FiltersBody
  ): Observable<BasicCarsResponse[]> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token ? token : '',
        });

        return this.http.post<BasicCarsResponse[]>(
          `${environment.apiBaseUrl}/api/basic-cars/?year=${year}`,
          {
            filters: {
              mainSerie: filters?.mainSerie,
              userProperty: filters?.userProperty,
            },
          },
          { headers }
        );
      })
    );
  }

  public getAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/api/available-filters/basic-years`
    );
  }

  public getAvailableSeries(year: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/api/available-filters/basic-series?main=${year}`
    );
  }

  public getCarById(
    carId: number,
    userId: number | undefined
  ): Observable<GET_CAR_BY_ID_RESPONSE> {
    return this.http.post<GET_CAR_BY_ID_RESPONSE>(
      `${environment.apiBaseUrl}/api/basic-cars/getCar?carId=${carId}`,
      {
        userId,
      }
    );
  }
}
