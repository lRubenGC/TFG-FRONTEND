import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BasicCar, BasicCarsResponse } from '../models/basic-cars.models';

@Injectable({
  providedIn: 'root',
})
export class BasicCarsService {
  constructor(private http: HttpClient) {}

  getCarsByYear(year: string): Observable<BasicCarsResponse[]> {
    return this.http.get<BasicCarsResponse[]>(
      `${environment.apiBaseUrl}/api/basic-cars/?year=${year}`, {}
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
