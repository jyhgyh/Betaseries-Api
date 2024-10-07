import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const token = localStorage.getItem('access_token');
        if (state.url === '/login') {
            // Autorise l'accès à la page de login même si l'utilisateur est authentifié
            return true;
        }
        if (token) {
            return true; // L'utilisateur est authentifié
        } else {
            this.router.navigate(['/login']); // Redirige vers la page de login si non authentifié
            return false;
        }
    }
}
