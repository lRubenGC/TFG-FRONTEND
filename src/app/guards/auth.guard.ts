import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GenericAuthService } from '../services/generic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private genericAuthService: GenericAuthService,
    private router: Router,
    ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.genericAuthService.isAuthenticated()
      .then(
        (loggedIn: boolean) => {
          if (loggedIn) {
            return true;
          } else {
            this.router.navigate(['/auth']);
            return false;
          }
        }
      );
  }
  
}
