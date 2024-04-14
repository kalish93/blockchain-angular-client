import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '../facades/auth.facade';
import { LOGIN_ROUTE, VERIFY_EMAIL_ROUTE } from '../../core/constants/routes';

@Injectable({ providedIn: 'root' })
export class EmailVerifiedGuardService {
  constructor(
    private authFacade: AuthFacade, 
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isUserLoggedIn = false;
    let isEmailVerified = false;
    this.authFacade.currentUser$.subscribe((user) => {
      if (user && user.isEmailVerified) {
        isUserLoggedIn = true;
        isEmailVerified = true;
      } else if (user && !user.isEmailVerified) {
        isUserLoggedIn = true;
      }
    });
    
    if (!isUserLoggedIn) {
      this.router.navigate([LOGIN_ROUTE]);
    } else if (isUserLoggedIn && !isEmailVerified) {
      this.router.navigate([VERIFY_EMAIL_ROUTE]);
    }
    return isUserLoggedIn && isEmailVerified;
  }
}
