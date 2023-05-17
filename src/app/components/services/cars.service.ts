import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { userInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  addBasicCar(id_car: number, id_user: number, carBody: any): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    })

    return this.http.post(`${this.apiUrl}/user-basic-cars/${id_user}`,
      {
        BasicCarId: id_car,
        hasCar: carBody.hasCar,
        wantsCar: carBody.wantsCar
      },
      {
        headers
      });
  }
  
}
