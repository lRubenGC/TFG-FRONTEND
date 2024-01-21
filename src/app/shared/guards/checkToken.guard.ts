import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckToken implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    this.authService.isValidToken();
    return true;
  }
}
