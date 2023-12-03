import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IPROPERTY_TYPE } from 'src/app/modules/basic-cars/models/basic-cars.models';
import { environment } from 'src/environments/environment';

interface IADD_CAR_TO_USER {
  msg: string;
  ok: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BasicCarsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public addCarToUser(
    carId: number,
    propertyType: IPROPERTY_TYPE
  ): Observable<IADD_CAR_TO_USER> {
    const { hasCar, wantsCar } = propertyType;
    return this.authService.isValidToken().pipe(
      switchMap((tokenObject) => {
        if (tokenObject.isValidToken && tokenObject.token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'r-token': tokenObject.token,
          });
          return this.http.post<IADD_CAR_TO_USER>(
            `${environment.apiBaseUrl}/api/user-basic-cars/addCar?userId=${tokenObject.userId}`,
            {
              BasicCarId: carId,
              hasCar,
              wantsCar,
            },
            { headers }
          );
        } else
          return of({
            ok: false,
            msg: '',
          });
      })
    );
  }

  public removeCarFromUser(carId: number): Observable<IADD_CAR_TO_USER> {
    return this.authService.isValidToken().pipe(
      switchMap((tokenObject) => {
        if (tokenObject.isValidToken && tokenObject.token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'r-token': tokenObject.token,
          });
          const options = {
            headers,
            body: {
              BasicCarId: carId,
            },
          };

          return this.http.delete<IADD_CAR_TO_USER>(
            `${environment.apiBaseUrl}/api/user-basic-cars/removeCar?userId=${tokenObject.userId}`,
            options
          );
        } else {
          return of({
            ok: false,
            msg: '',
          });
        }
      })
    );
  }
}
