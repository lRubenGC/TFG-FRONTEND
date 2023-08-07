import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PremiumCarsService {

  constructor(private http: HttpClient) { }
  

  getCars(main_serie: string): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/premium-cars/?main_serie=${main_serie}`);
  }

  getAvailableSeries(main: string): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/available-series?main=${main}`);
  }

  getUserCars(idUser: number): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/user-premium-cars/${idUser}`);
  }

}
