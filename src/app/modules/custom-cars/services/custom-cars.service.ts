import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CUSTOM_CARS_ORDER_TYPE,
  CUSTOM_CAR_CREATE_RESPONSE,
  CUSTOM_CAR_FORM,
  GET_CAR_BY_ID_RESPONSE,
  ICUSTOM_CAR,
} from '../models/custom-cars.models';

@Injectable({
  providedIn: 'root',
})
export class CustomCarsService {
  constructor(private http: HttpClient) {}

  public getCarsList(order: CUSTOM_CARS_ORDER_TYPE): Observable<ICUSTOM_CAR[]> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });

    return this.http.post<ICUSTOM_CAR[]>(
      `${environment.apiBaseUrl}/api/custom-cars/get-list`,
      { order },
      { headers }
    );
  }

  public upvoteCar(customCarId: number): Observable<{ ok: boolean }> {
    const token = localStorage.getItem('dt-token');
    const userId = Number(localStorage.getItem('userId'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ?? '',
    });
    return this.http.post<{ ok: boolean }>(
      `${environment.apiBaseUrl}/api/custom-cars/upvote`,
      {
        customCarId,
        userId,
      },
      { headers }
    );
  }

  public downvoteCar(customCarId: number): Observable<{ ok: boolean }> {
    const token = localStorage.getItem('dt-token');
    const userId = Number(localStorage.getItem('userId'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ?? '',
    });
    return this.http.post<{ ok: boolean }>(
      `${environment.apiBaseUrl}/api/custom-cars/downvote`,
      {
        customCarId,
        userId,
      },
      { headers }
    );
  }

  public uploadCar(
    form: CUSTOM_CAR_FORM
  ): Observable<CUSTOM_CAR_CREATE_RESPONSE> {
    const token = localStorage.getItem('dt-token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'r-token': token ?? '',
    });

    const formData = new FormData();
    form.imgs.forEach((img: File, index: number) => {
      formData.append(`imgs[${index}]`, img);
    });
    if (form.model_name) formData.append('model_name', form.model_name);
    if (userId) formData.append('userId', userId);

    return this.http.post<CUSTOM_CAR_CREATE_RESPONSE>(
      `${environment.apiBaseUrl}/api/custom-cars/create`,
      formData,
      { headers }
    );
  }

  public getCarById(carId: number): Observable<GET_CAR_BY_ID_RESPONSE> {
    const userId = localStorage.getItem('userId');
    return this.http.post<GET_CAR_BY_ID_RESPONSE>(
      `${environment.apiBaseUrl}/api/custom-cars/getCar?carId=${carId}`,
      {
        userId,
      }
    );
  }
}
