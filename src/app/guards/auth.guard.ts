import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../views/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
      this.authService.getUserLoggedIn().subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
      });
    }
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}