import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private userService: User, private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('username')) {
      return true;  
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
