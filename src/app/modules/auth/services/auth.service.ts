import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UserData,
  loginInterface,
  registerInterface,
  tokenDecoded,
} from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private isValidToken(): boolean {
    const token = localStorage.getItem('dt-token');
    if (token) {
      const decodedToken: tokenDecoded = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp > expirationTime) {
        return false;
      } else {
        const userId = decodedToken.id;
        return true;
      }
    } else {
      return false;
    }
  }

  public login(body: loginInterface): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/auth/login`, {
      email: body.email,
      password: body.password,
    });
  }

  public register(body: registerInterface): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/users`, {
      username: body.username,
      email: body.email,
      password: body.password,
    });
  }

  public getUserById(): Observable<UserData | null> {
    const userId = localStorage.getItem('userId');
    const isValidToken = this.isValidToken();

    if (isValidToken && userId) {
      return this.http.get<UserData>(
        `${environment.apiBaseUrl}/api/users/${userId}`
      );
    } else return of(null);
  }
}
