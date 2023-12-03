import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericAuthService {
  private loggedIn: boolean = false;

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 300);
      }
    );
    return promise;
  }
  

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
