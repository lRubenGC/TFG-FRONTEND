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

  async getUserData(id: number): Promise<userInterface | any> {
    const response = await this.http.get(`${this.apiUrl}/users/${id}`).toPromise();
    return response as userInterface;
  }
  
}
