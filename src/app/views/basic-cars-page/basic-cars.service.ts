import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicCarsService {

  constructor(private http: HttpClient) { }
  

  getCarsByYear(year: string): Observable<any> {
    return this.http.get(`http://api.diecasttracker.com:8000/api/basic-cars/?year=${year}`);
  }

  getAvailableSeries(year: string): Observable<any> {
    return this.http.get(`http://api.diecasttracker.com:8000/api/available-series?main=${year}`);
  }

  getUserCars(idUser: number): Observable<any> {
    return this.http.get(`http://api.diecasttracker.com:8000/api/user-basic-cars/${idUser}`);
  }

}
