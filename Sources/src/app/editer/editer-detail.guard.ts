import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditerDetailGuard implements CanActivate {
  constructor(private router:Router, private authService:AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let id =  +next.url[1].path;
    if(this.authService.isAuthenticated()){
        if(isNaN(id) || id < 0)
        {
          this.router.navigate(['/connecte']);
          return false;
        }
      return true;
    }    
    this.router.navigate(['/connexion']);
    return false;
  }
}
