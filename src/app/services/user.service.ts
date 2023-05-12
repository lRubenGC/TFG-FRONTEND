import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUserData(id: number): Observable<userInterface | any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
}
