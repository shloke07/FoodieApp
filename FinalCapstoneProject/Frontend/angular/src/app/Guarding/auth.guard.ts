import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice:AuthService,private snackBar : MatSnackBar,private router:Router,){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      if (this.authservice.isUserLoggedIn) {
        return true;
      }
      else {
        this.snackBar.open("Permission Denied", "Close", {duration:2000});
        this.router.navigateByUrl('/login');
        return false;
      }
  }
  
}
