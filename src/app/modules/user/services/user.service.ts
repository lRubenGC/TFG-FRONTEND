import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { triggerDownload } from 'src/app/shared/functions/download';
import { environment } from 'src/environments/environment';
import { IUSER_DATA } from '../../auth/models/auth.models';
import { BasicCarsResponse } from '../../basic-cars/models/basic-cars.models';
import { ICUSTOM_CAR } from '../../custom-cars/models/custom-cars.models';
import { PremiumCarsResponse } from '../../premium-cars/models/premium-cars.models';
import {
  CAR_TYPE,
  IUSER_CARS_NUMBERS,
  UPDATE_USER_FORM,
  USER_PROPERTY,
} from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserData(username: string): Observable<IUSER_DATA> {
    return this.http.post<IUSER_DATA>(
      `${environment.apiBaseUrl}/api/users/get-user`,
      { username }
    );
  }

  public getUserById(): Observable<IUSER_DATA | null> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.post<IUSER_DATA>(
        `${environment.apiBaseUrl}/api/users/get-user`,
        {
          id: userId,
        }
      );
    } else return of(null);
  }

  public getUserNumbers(id: number): Observable<IUSER_CARS_NUMBERS> {
    return this.http.post<IUSER_CARS_NUMBERS>(
      `${environment.apiBaseUrl}/api/users/get-user-numbers`,
      { id }
    );
  }

  public async downloadUserCollection(userId: number): Promise<void> {
    try {
      const token = localStorage.getItem('dt-token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'r-token': token ? token : '',
      });
      const response = await this.http
        .post(
          `${environment.apiBaseUrl}/api/users/get-collection`,
          { userId },
          {
            responseType: 'blob',
            headers,
          }
        )
        .toPromise();

      if (response) {
        triggerDownload(response, `user_${userId}_collection.zip`);
      }
    } catch (error: any) {
      throw new Error('Error downloading the user collection');
    }
  }

  public getMainFilters(id: number, car_type: CAR_TYPE): Observable<string[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });
    return this.http.post<string[]>(
      `${environment.apiBaseUrl}/api/users/get-main-filters`,
      { id, car_type },
      { headers }
    );
  }

  public getSecondaryFilters(
    id: number,
    car_type: CAR_TYPE,
    main_serie: string
  ): Observable<string[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });
    return this.http.post<string[]>(
      `${environment.apiBaseUrl}/api/users/get-secondary-filters`,
      { id, main_serie, car_type },
      { headers }
    );
  }

  public getUserBasicCars(
    id: number,
    year: string,
    mainSerie: string,
    userProperty: USER_PROPERTY
  ): Observable<BasicCarsResponse[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });
    return this.http.post<BasicCarsResponse[]>(
      `${environment.apiBaseUrl}/api/user-basic-cars/get-basic/?year=${year}`,
      { id, filters: { mainSerie, userProperty } },
      { headers }
    );
  }

  public getUserPremiumCars(
    id: number,
    mainSerie: string,
    secondarySerie: string,
    userProperty: USER_PROPERTY
  ): Observable<PremiumCarsResponse[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });
    return this.http.post<PremiumCarsResponse[]>(
      `${environment.apiBaseUrl}/api/user-premium-cars/get-premium`,
      { id, mainSerie, filters: { secondarySerie, userProperty } },
      { headers }
    );
  }

  public getUserCustomCars(id: number): Observable<ICUSTOM_CAR[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });
    return this.http.post<ICUSTOM_CAR[]>(
      `${environment.apiBaseUrl}/api/users/get-user-custom-cars`,
      { id },
      { headers }
    );
  }

  public updateUser(form: UPDATE_USER_FORM): Observable<any> {
    const token = localStorage.getItem('dt-token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'r-token': token ?? '',
    });

    const formData = new FormData();
    if (form.imgs.length >= 1) formData.append(`img`, form.imgs[0]);
    if (form.password.length) formData.append('password', form.password);
    if (userId) formData.append('userId', userId);
    formData.append('username', form.username);
    formData.append('email', form.email);

    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/users/update`,
      formData,
      { headers }
    );
  }
}
