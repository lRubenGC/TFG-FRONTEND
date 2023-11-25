import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getTokenFromIndexedDB } from '../functions/token-functions';
import { IPROPERTY_TYPE } from '../models/basic-cars-shared.models';

interface IADD_CAR_TO_USER {
  msg: string;
  ok: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BasicCarsSharedService {
  constructor(private http: HttpClient) {}

  public addCarToUser(
    userId: number,
    carId: number,
    propertyType: IPROPERTY_TYPE
  ): Observable<IADD_CAR_TO_USER> {
    const { hasCar, wantsCar } = propertyType;
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token!,
        });

        return this.http.post<IADD_CAR_TO_USER>(
          `${environment.apiBaseUrl}/api/user-basic-cars/addCar?userId=${userId}`,
          {
            BasicCarId: carId,
            hasCar,
            wantsCar,
          },
          { headers }
        );
      })
    );
  }

  public removeCarFromUser(
    userId: number,
    carId: number
  ): Observable<IADD_CAR_TO_USER> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token!,
        });

        const options = {
          headers,
          body: {
            BasicCarId: carId,
          },
        };

        return this.http.delete<IADD_CAR_TO_USER>(
          `${environment.apiBaseUrl}/api/user-basic-cars/removeCar?userId=${userId}`,
          options
        );
      })
    );
  }
}
