import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import {AuthService, IAuthStatus} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
    protected currentAuthStatus: IAuthStatus;
    constructor(private authService: AuthService, private router: Router) {
        this.authService.authStatus.subscribe(authStatus =>
            this.currentAuthStatus = this.authService.getAuthStatus());
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkPermisos(childRoute);
    }
    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkLogin();
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkPermisos(next);
    }
    protected checkLogin() {
        if (this.authService.getToken() == null || this.authService.getToken() === '') {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
    protected checkPermisos(route?: ActivatedRouteSnapshot) {
        let roleMatch = true;
        if (route) {
            const expectedRole = route.data.expectedRole;
            if (expectedRole) {
                roleMatch = this.currentAuthStatus.role === expectedRole;
                if (this.currentAuthStatus.role === "none") {
                    this.authService.logout();
                    return false;
                }
            }
        }
        if (!roleMatch) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
