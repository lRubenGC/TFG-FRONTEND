import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetailedCarService {

  constructor(private http: HttpClient) { }
  

  getCarById(carId: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/api/basic-cars/?carId=${carId}`);
  }

}
