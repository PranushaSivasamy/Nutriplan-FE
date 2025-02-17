import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (!!sessionStorage.getItem('token')) return true;
    else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
