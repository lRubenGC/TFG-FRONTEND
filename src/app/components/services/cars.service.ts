import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    });

    return this.http.post(`${this.apiUrl}/user-basic-cars/${id_user}`, {
      BasicCarId: id_car,
      hasCar: carBody.hasCar,
      wantsCar: carBody.wantsCar
    }, { headers });
  }

  removeBasicCar(id_car: number, id_user: number): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    })

    const options = {
      headers,
      body: {
        BasicCarId: id_car
      }
    }

    return this.http.delete(`${this.apiUrl}/user-basic-cars/${id_user}`, options);
  }

  addPremiumCar(id_car: number, id_user: number, carBody: any): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    });

    return this.http.post(`${this.apiUrl}/user-premium-cars/${id_user}`, {
      PremiumCarId: id_car,
      hasCar: carBody.hasCar,
      wantsCar: carBody.wantsCar
    }, { headers });
  }

  removePremiumCar(id_car: number, id_user: number): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    })

    const options = {
      headers,
      body: {
        PremiumCarId: id_car
      }
    }

    return this.http.delete(`${this.apiUrl}/user-premium-cars/${id_user}`, options);
  }

  voteCustomCar(id_car: number, id_user: number): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    });

    return this.http.post(`${this.apiUrl}/custom-cars/vote/${id_user}`, {
      customCarId: id_car
    }, { headers });
  }

  unvoteCustomCar(id_car: number, id_user: number): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    })

    const options = {
      headers,
      body: {
        customCarId: id_car
      }
    }

    return this.http.delete(`${this.apiUrl}/custom-cars/vote/${id_user}`, options);
  }

  getUserVotes(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/custom-cars/user-votes/${userId}`);
  }
  
}
