import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicCarsService {

  constructor(private http: HttpClient) { }
  

  getCarsByYear(year: string): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/basic-cars/?year=${year}`);
  }

  getAvailableSeries(year: string): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/available-series?main=${year}`);
  }

  getUserCars(idUser: number): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/user-basic-cars/${idUser}`);
  }

}
