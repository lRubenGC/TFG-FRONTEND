import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { basicCarInterface } from 'src/app/models/cardTypes.interface';

@Injectable({
  providedIn: 'root'
})
export class BasicCarsService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  

  getCarsByYear(year: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/basic-cars/?year=${year}`);
  }

  getAvailableSeries(year: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/available-series?main=${year}`);
  }

}
