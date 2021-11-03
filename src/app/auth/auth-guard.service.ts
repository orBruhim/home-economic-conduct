import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | Promise<boolean> {
    // return this.authService.getUser().pipe(
    //   map(user => {
    //     if (user) {
    //       console.log(user);
    //       return true
    //     } else {
    //       console.log(user);
    //       this.router.navigate(['/auth']);
    //       return false
    //     }
    //   })
    // );
    // return this.authService.user$.pipe(map((user: any) =>{
    //   return !!user;
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        const isAuth = !!user.id;
        if (isAuth) {
          console.log(true);

          return true;
        }
        console.log(false);

        return this.router.createUrlTree(['/auth']);
      })
    );
  }

}
