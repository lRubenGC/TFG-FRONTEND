import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UserData,
  loginInterface,
  registerInterface,
  tokenDecoded,
  userIdToken,
} from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public isValidToken(): Observable<userIdToken> {
    return new Observable((observer) => {
      const token = localStorage.getItem('dt-token');
      if (token) {
        const decodedToken: tokenDecoded = jwtDecode(token);
        const expirationTime = decodedToken.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (currentTimestamp > expirationTime) {
          observer.next({ isValidToken: false });
        } else {
          this.isUserLoggedIn$.next(true);
          const userId = decodedToken.id;
          observer.next({
            isValidToken: true,
            token,
            userId,
          });
        }
      } else {
        observer.next({ isValidToken: false });
      }
      observer.complete();
    });
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

  public getUserById(id: number): Observable<UserData> {
    return this.http.get<UserData>(`${environment.apiBaseUrl}/api/users/${id}`);
  }
}
