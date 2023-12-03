import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  BasicCarsResponse,
  FiltersBody,
  GET_CAR_BY_ID_RESPONSE,
  IOWNED_CARS,
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
    const token = localStorage.getItem('dt-token');
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

  public getCarById(carId: number): Observable<GET_CAR_BY_ID_RESPONSE> {
    const userId = localStorage.getItem('userId');
    const url = userId
      ? `${environment.apiBaseUrl}/api/basic-cars/getCar?carId=${carId}`
      : `${environment.apiBaseUrl}/api/basic-cars/getCar`;
    return this.http.post<GET_CAR_BY_ID_RESPONSE>(url, {
      userId,
    });
  }

  public getOwnedCars(year: string): Observable<IOWNED_CARS> {
    const userId = localStorage.getItem('userId');
    const url = userId
      ? `${environment.apiBaseUrl}/api/user-basic-cars/getAmount?userId=${userId}`
      : `${environment.apiBaseUrl}/api/user-basic-cars/getAmount`;
    return this.http.post<IOWNED_CARS>(url, {
      year,
    });
  }
}
