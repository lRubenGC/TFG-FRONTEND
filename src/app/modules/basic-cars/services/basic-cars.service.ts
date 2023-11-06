import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';

import { getTokenFromIndexedDB } from 'src/app/helpers/indexedDB';
import { environment } from 'src/environments/environment';
import { BasicCarsResponse, FiltersBody } from '../models/basic-cars.models';

@Injectable({
  providedIn: 'root',
})
export class BasicCarsService {
  constructor(private http: HttpClient) {}

  getCarsByYear(
    year: string,
    filters?: FiltersBody
  ): Observable<BasicCarsResponse[]> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token!,
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

  // getAvailableSeries(year: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.apiBaseUrl}/api/available-series?main=${year}`
  //   );
  // }

  // getUserCars(idUser: number): Observable<any> {
  //   return this.http.get(
  //     `${environment.apiBaseUrl}/api/user-basic-cars/${idUser}`
  //   );
  // }
}
