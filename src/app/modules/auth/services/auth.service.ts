import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IUSER_DATA,
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

  public isValidToken(): boolean {
    const token = localStorage.getItem('dt-token');
    if (token) {
      const decodedToken: tokenDecoded = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (currentTimestamp > expirationTime) {
        this.isUserLoggedIn$.next(false);
        localStorage.removeItem('dt-token');
        localStorage.removeItem('userId');
        return false;
      } else {
        this.isUserLoggedIn$.next(true);
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

  public getUserById(): Observable<IUSER_DATA | null> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.post<IUSER_DATA>(
        `${environment.apiBaseUrl}/api/users/get-user`,
        {
          id: userId,
        }
      );
    } else return of(null);
  }
}
