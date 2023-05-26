import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  

  getCars(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/cars/${query}`);
  }

  getUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/users/${query}`);
  }

}
