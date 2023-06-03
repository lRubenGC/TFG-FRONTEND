import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
