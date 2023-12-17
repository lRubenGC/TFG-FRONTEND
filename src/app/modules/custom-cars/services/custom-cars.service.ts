import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CUSTOM_CARS_ORDER_TYPE,
  CUSTOM_CAR_FORM,
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

  public upvoteCar(customCarId: number): Observable<any> {
    const token = localStorage.getItem('dt-token');
    const userId = Number(localStorage.getItem('userId'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ?? '',
    });
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/custom-cars/upvote`,
      {
        customCarId,
        userId,
      },
      { headers }
    );
  }

  public downvoteCar(customCarId: number): Observable<any> {
    const token = localStorage.getItem('dt-token');
    const userId = Number(localStorage.getItem('userId'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ?? '',
    });
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/custom-cars/downvote`,
      {
        customCarId,
        userId,
      },
      { headers }
    );
  }

  public uploadCar(form: CUSTOM_CAR_FORM): Observable<any> {
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

    // TODO: Tipar todo este archivo
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/custom-cars/create`,
      formData,
      { headers }
    );
  }
}
