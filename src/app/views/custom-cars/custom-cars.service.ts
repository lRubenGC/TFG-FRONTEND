import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomCarsService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  

  getCustomCars(): Observable<any> {
    return this.http.get(`${this.apiUrl}/custom-cars`);
  }

  uploadCustomCar(id_user: number, carBody: any): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    });

    return this.http.post(`${this.apiUrl}/custom-cars/${id_user}`, {
      car_id: carBody.car_id,
      model_name: carBody.model_name,
      year: carBody.year,
      brand: carBody.brand,
      imgs: 'value'
    }, { headers });
  }

}
