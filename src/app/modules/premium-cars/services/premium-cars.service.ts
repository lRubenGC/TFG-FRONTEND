import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  FiltersBody,
  GET_CAR_BY_ID_RESPONSE,
  IOWNED_CARS,
  PremiumCarsResponse,
} from '../models/premium-cars.models';

@Injectable({
  providedIn: 'root',
})
export class PremiumCarsService {
  constructor(private http: HttpClient) {}

  public getCarsByMainSerie(
    main_serie: string,
    filters?: FiltersBody
  ): Observable<PremiumCarsResponse[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });

    return this.http.post<PremiumCarsResponse[]>(
      `${environment.apiBaseUrl}/api/premium-cars`,
      {
        main_serie,
        filters: {
          secondarySerie: filters?.secondarySerie,
          userProperty: filters?.userProperty,
        },
      },
      { headers }
    );
  }

  public getAvailableMainSeries(): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/api/available-filters/premium-series`
    );
  }

  public getAvailableSecondarySeries(
    secondarySerie: string
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.apiBaseUrl}/api/available-filters/premium-secondary-series?main=${secondarySerie}`
    );
  }

  public getCarById(carId: number): Observable<GET_CAR_BY_ID_RESPONSE> {
    const userId = localStorage.getItem('userId');
    return this.http.post<GET_CAR_BY_ID_RESPONSE>(
      `${environment.apiBaseUrl}/api/basic-cars/getCar?carId=${carId}`,
      {
        userId,
      }
    );
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
