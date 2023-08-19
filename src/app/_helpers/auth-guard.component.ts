import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../_services/auth_user.services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const mustLogin = (route.data as any).mustLogin;

    if (mustLogin && !this.userService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!mustLogin && this.userService.isUserLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
