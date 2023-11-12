import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserData } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserById(id: number): Observable<UserData> {
    return this.http.get<UserData>(`${environment.apiBaseUrl}/api/users/${id}`);
  }
}
