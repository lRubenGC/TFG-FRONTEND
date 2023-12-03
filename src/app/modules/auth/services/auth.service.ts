import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { loginInterface, registerInterface } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(body: loginInterface): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/auth/login`, {
      email: body.email,
      password: body.password,
    });
  }

  register(body: registerInterface): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/users`, {
      username: body.username,
      email: body.email,
      password: body.password,
    });
  }
}
