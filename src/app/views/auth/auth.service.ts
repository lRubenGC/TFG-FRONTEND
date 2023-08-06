import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { loginInterface, registerInterface } from 'src/app/models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  login(body: loginInterface): Observable<any> {
    return this.http.post(`:8000/api/auth/login`, {
      email: body.email,
      password: body.password,
    });
  }

  setUserLoggedIn(value: boolean) {
    this.userLoggedIn.next(value);
  }

  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  register(body: registerInterface): Observable<any> {
    return this.http.post(`:8000/api/users`, {
      username: body.username,
      email: body.email,
      password: body.password,
    });
  }
}
