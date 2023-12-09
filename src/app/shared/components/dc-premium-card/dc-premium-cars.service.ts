import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IPROPERTY_TYPE } from 'src/app/modules/premium-cars/models/premium-cars.models';
import { environment } from 'src/environments/environment';

interface IADD_CAR_TO_USER {
  msg: string;
  ok: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PremiumCardService {
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
      `${environment.apiBaseUrl}/api/user-premium-cars/addCar?userId=${userId}`,
      {
        PremiumCarId: carId,
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
        PremiumCarId: carId,
      },
    };

    return this.http.delete<IADD_CAR_TO_USER>(
      `${environment.apiBaseUrl}/api/user-premium-cars/removeCar?userId=${userId}`,
      options
    );
  }
}
