import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    const token = localStorage.getItem('dt-token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ?? '',
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
  }

  public removeCarFromUser(carId: number): Observable<IADD_CAR_TO_USER> {
    const token = localStorage.getItem('dt-token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ?? '',
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
  }
}
