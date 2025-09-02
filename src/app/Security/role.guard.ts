import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return this.router.createUrlTree(['/']);
    }

    const requiredRoles = route.data['roles'] as string[] | undefined;
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; 
    }

    const userRoles = this.auth.getUserRoles();
    const hasAccess = requiredRoles.some(r => userRoles.includes(r));

    return hasAccess ? true : this.router.createUrlTree(['/home']);
  }
}
