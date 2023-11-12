import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GenericAuthService } from '../services/generic-auth.service';
import { getTokenFromIndexedDB } from '../helpers/indexedDB';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private genericAuthService: GenericAuthService,
    private router: Router,
    ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = await getTokenFromIndexedDB();

    return this.genericAuthService.isAuthenticated()
      .then(
        (loggedIn: boolean) => {
          if (loggedIn || token) {
            return true;
          } else {
            this.router.navigate(['/auth']);
            return false;
          }
        }
      );
  }
  
}
