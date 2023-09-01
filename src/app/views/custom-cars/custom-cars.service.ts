import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, mergeMap } from 'rxjs';
import { customCarUpdateRequest } from 'src/app/models/cardTypes.interface';

import { environment } from 'src/environments/environment';
import { getTokenFromIndexedDB } from 'src/app/helpers/indexedDB';


@Injectable({
  providedIn: 'root'
})
export class CustomCarsService {

  constructor(private http: HttpClient) { }
  

  getCustomCars(userCreator?: number): Observable<any> {
    if (!userCreator) {
      return this.http.get(`${environment.apiBaseUrl}/api/custom-cars`);
    }
    return this.http.get(`${environment.apiBaseUrl}/api/custom-cars?userCreator=${userCreator}`);
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/api/custom-cars/${carId}`);
  }

  uploadCustomCar(id_user: number, carBody: any): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token!
        });
    
        return this.http.post(`${environment.apiBaseUrl}/api/custom-cars/${id_user}`, {
          car_id: carBody.car_id,
          model_name: carBody.model_name,
          year: carBody.year,
          brand: carBody.brand,
          imgs: 'value'
        }, { headers });
      })
    );
  }

  updateCustomCar(id_user: number, id_car: number, userParams: customCarUpdateRequest): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token!
        });
    
        const requestBody: customCarUpdateRequest = {}
    
        if (userParams.car_id) {
          requestBody.car_id = userParams.car_id;
        }
        if (userParams.model_name) {
          requestBody.model_name = userParams.model_name;
        }
        if (userParams.year) {
          requestBody.year = userParams.year;
        }
        if (userParams.brand) {
          requestBody.brand = userParams.brand;
        }
    
        return this.http.put(`${environment.apiBaseUrl}/api/custom-cars/update/${id_user}/${id_car}`, requestBody, { headers });
      })
    );
  }

  uploadImg(id_user: number, id_car: number, file: File): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({ 'r-token': token! });
        const formData = new FormData();
        
        formData.append('file', file);
        
        return this.http.post(`${environment.apiBaseUrl}/api/custom-cars/upload/${id_user}/${id_car}`, formData, { headers });
      })
    );
  }

  deleteImg(id_user: number, id_car: number, id_img: string): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({ 'r-token': token! });
            
        return this.http.post(`${environment.apiBaseUrl}/api/custom-cars/delete/${id_user}/${id_car}`, {
          imgId: id_img
        }, { headers });
      })
    );
  }

}
