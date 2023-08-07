import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor(private http: HttpClient) { }
  

  getCars(query: string): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/search/cars/${query}`);
  }

  getUsers(query: string): Observable<any> {
    return this.http.get(`https://api.diecasttracker.com/api/search/users/${query}`);
  }

}
