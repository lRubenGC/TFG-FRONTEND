import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { userInterfaceApi, userUpdateRequest } from '../models/user.interface';

import { environment } from 'src/environments/environment';
import { getTokenFromIndexedDB } from '../helpers/indexedDB';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getUserData(id: number): Promise<userInterfaceApi | any> {
    const response = await this.http.get(`${environment.apiBaseUrl}/api/users/${id}`).toPromise();
    return response as userInterfaceApi;
  }

  async getUserByUsername(username: string): Promise<userInterfaceApi | any> {
    const response = await this.http.get(`${environment.apiBaseUrl}/api/users/username/${username}`).toPromise();
    return response as userInterfaceApi;
  }  

  updateUser(id_user: number, userParams: userUpdateRequest): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'r-token': token
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
  
        return this.http.put(`${environment.apiBaseUrl}/api/users/${id_user}`, requestBody, { headers });
      })
    );
  }

  updateImg(id_user: number, file: File, bg: boolean = false): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({ 'r-token': token! });
        const formData = new FormData();
        
        formData.append('file', file);
      
        if (bg) {
          return this.http.post(`${environment.apiBaseUrl}/api/users/bg-img/${id_user}`, formData, { headers });
        }
        
        return this.http.post(`${environment.apiBaseUrl}/api/users/img/${id_user}`, formData, { headers });
      })
    );
  }

  deleteImg(id_user: number, bg: boolean = false): Observable<any> {
    return from(getTokenFromIndexedDB()).pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({ 'r-token': token! });    
      
        if (bg) {
          return this.http.delete(`${environment.apiBaseUrl}/api/users/bg-img/${id_user}`, { headers });
        }
        
        return this.http.delete(`${environment.apiBaseUrl}/api/users/img/${id_user}`, { headers });
      }));
  }

  async downloadUserCollection(id: number): Promise<void> {
    try {
      const token = await getTokenFromIndexedDB();

      const headers = new HttpHeaders({ 'r-token': token });

      const response = await this.http.get(`${environment.apiBaseUrl}/api/users/get-collection/${id}`, { 
          responseType: 'blob',
          headers: headers 
      }).toPromise();

      if (response) {
          this.triggerDownload(response, `user_${id}_collection.zip`);
      }
    } catch (error: any) {
        throw new Error('Error downloading the user collection');
    }
  }
  

  private triggerDownload(data: Blob, filename: string): void {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  
}
