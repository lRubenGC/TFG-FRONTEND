import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor(private http: HttpClient) { }
  

  getCars(query: string): Observable<any> {
    return this.http.get(`/search/cars/${query}`);
  }

  getUsers(query: string): Observable<any> {
    return this.http.get(`/search/users/${query}`);
  }

}
