import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userInterfaceApi, userUpdateRequest } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getUserData(id: number): Promise<userInterfaceApi | any> {
    const response = await this.http.get(`http://62.72.6.21:8000/api/users/${id}`).toPromise();
    return response as userInterfaceApi;
  }

  async getUserByUsername(username: string): Promise<userInterfaceApi | any> {
    const response = await this.http.get(`http://62.72.6.21:8000/api/users/username/${username}`).toPromise();
    return response as userInterfaceApi;
  }

  updateUser(id_user: number, userParams: userUpdateRequest): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'r-token': token!
    });

    const requestBody: userUpdateRequest = {}

    if (userParams.username) {
      requestBody.username = userParams.username;
    }
    if (userParams.email) {
      requestBody.email = userParams.email;
    }
    if (userParams.password) {
      requestBody.password = userParams.password;
    }

    return this.http.put(`http://62.72.6.21:8000/api/users/${id_user}`, requestBody, { headers });
  }

  updateImg(id_user: number, file: File, bg: boolean = false): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({ 'r-token': token! });
    const formData = new FormData();
    
    formData.append('file', file);
  
    if (bg) {
      return this.http.post(`http://62.72.6.21:8000/api/users/bg-img/${id_user}`, formData, { headers });
    }
    
    return this.http.post(`http://62.72.6.21:8000/api/users/img/${id_user}`, formData, { headers });
  }

  deleteImg(id_user: number, bg: boolean = false): Observable<any> {
    const token = localStorage.getItem('cw-token');
    const headers = new HttpHeaders({ 'r-token': token! });    
  
    if (bg) {
      return this.http.delete(`http://62.72.6.21:8000/api/users/bg-img/${id_user}`, { headers });
    }
    
    return this.http.delete(`http://62.72.6.21:8000/api/users/img/${id_user}`, { headers });
  }
  
  
}
