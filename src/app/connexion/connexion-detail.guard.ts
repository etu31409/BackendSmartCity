import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionDetailGuard implements CanActivate {

  constructor(private authService:AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if(!localStorage.get("token")){
    //   return false;
    // }else{
    //   return true;
    // }
    if(this.authService.getToken())
    {
      return true;
    }
    return false;
  }
}
