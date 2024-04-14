import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import {EmailVerifiedGuardService} from './email-verified-guard.service';

export const EmailVerifiedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(EmailVerifiedGuardService).canActivate(route, state);
};
