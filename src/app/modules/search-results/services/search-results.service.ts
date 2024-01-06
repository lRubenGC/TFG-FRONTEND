import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUSER_DATA } from '../../auth/models/auth.models';
import {
  SEARCH_CARS_FILTERS,
  SEARCH_CARS_ORDER,
  SEARCH_CARS_RESPONSE,
} from '../models/search-results.models';

@Injectable({
  providedIn: 'root',
})
export class SearchResultsService {
  constructor(private http: HttpClient) {}

  public getCars(
    model_name: string,
    filters: SEARCH_CARS_FILTERS,
    order: SEARCH_CARS_ORDER
  ): Observable<SEARCH_CARS_RESPONSE> {
    const token = localStorage.getItem('dt-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token ? token : '',
    });

    return this.http.post<SEARCH_CARS_RESPONSE>(
      `${environment.apiBaseUrl}/api/search/cars/${model_name}`,
      {
        filters,
        order,
      },
      { headers }
    );
  }

  public getUsers(username: string): Observable<IUSER_DATA[]> {
    return this.http.get<IUSER_DATA[]>(
      `${environment.apiBaseUrl}/api/search/users/${username}`
    );
  }
}
