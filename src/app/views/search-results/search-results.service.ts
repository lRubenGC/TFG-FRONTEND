import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor(private http: HttpClient) { }
  

  getCars(query: string): Observable<any> {
    return this.http.get(`http://62.72.6.21:8000/api/search/cars/${query}`);
  }

  getUsers(query: string): Observable<any> {
    return this.http.get(`http://62.72.6.21:8000/api/search/users/${query}`);
  }

}
