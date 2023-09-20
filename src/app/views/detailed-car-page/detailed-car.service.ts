import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { basicCarInterface, premiumCarInterface } from 'src/app/models/cardTypes.interface';


@Injectable({
  providedIn: 'root'
})
export class DetailedCarService {

  constructor(private http: HttpClient) { }
  

  // Returns 1 Basic or Premium (carType) car
  getCarById(carId: string, carType: string): Observable<basicCarInterface | premiumCarInterface> {
    return this.http.get<basicCarInterface | premiumCarInterface>(`${environment.apiBaseUrl}/api/${carType}-cars/getCar/${carId}`);
  }  

}
