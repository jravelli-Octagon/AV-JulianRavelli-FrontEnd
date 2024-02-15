import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

	userPermission: Array<string>;

    constructor(private router: Router) {
		this.userPermission = JSON.parse(sessionStorage.getItem('user-permissions'));
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.userPermission = JSON.parse(sessionStorage.getItem('user-permissions'));

		const path = state.url.substr(1).toUpperCase();

        const firstSegment = path.split('/').join('_').split('-').join('_');

        if (sessionStorage.getItem('isLoggedin') && (path === 'HOME' || this.matchingPermission( firstSegment ))) {
           return true;
       }

       sessionStorage.clear();

        this.router.navigate(['/']);
        return false;
    }

	canShowMenuItem(menuItem) {
		return this.matchingPermission(menuItem.toUpperCase());
	}

	private matchingPermission(requiredPermission): boolean {
		const reqPermission = requiredPermission.split('-').join('_');
		let hasPermission = false;
		this.userPermission.forEach(permission => {
			if (permission === reqPermission) {
				hasPermission = true;
				return true;
			}
		});

		return hasPermission;
	}
}


