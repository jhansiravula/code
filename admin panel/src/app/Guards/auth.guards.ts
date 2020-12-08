import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';



@Injectable({
    providedIn: 'root'
  })
export class AuthGuards implements CanActivate {
  constructor(private auth: LoginService, private router: Router) { }


  canActivate() {
    if (this.auth.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
