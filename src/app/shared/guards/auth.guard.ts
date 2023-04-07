import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, NavigationCancel, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service"
import { RouteProviderService } from "../services/route-provider.service"


@Injectable()
export class AuthGuardService {
	canActivate(auth: AuthService, routeProvider: RouteProviderService, router: Router, activatedRoute: ActivatedRoute): boolean {
		if(auth.isLoggedIn) {
			return true
		}

		router.events.subscribe((e) => {
			if(e instanceof NavigationCancel) {
				auth.redirectUrl = e.url
			}
		})

		router.navigate([routeProvider.get('app:login')])
		return false
	}
}


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return inject(AuthGuardService).canActivate(
		inject(AuthService),
		inject(RouteProviderService),
		inject(Router),
		inject(ActivatedRoute),
	)
}
