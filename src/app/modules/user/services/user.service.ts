import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { triggerDownload } from 'src/app/shared/functions/download';
import { environment } from 'src/environments/environment';
import { IUSER_DATA } from '../../auth/models/auth.models';
import {
  CAR_TYPE,
  IUSER_CARS_NUMBERS,
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
  ): Observable<string[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });
    return this.http.post<string[]>(
      `${environment.apiBaseUrl}/api/user-basic-cars/get-basic/?year=${year}`,
      { id, filters: { mainSerie, userProperty } },
      { headers }
    );
  }
}
