import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from "../services/auth.service"
import { RouteProviderService } from "../services/route-provider.service"


@Injectable()
export class AuthGuardService {
	canActivate(auth: AuthService, routeProvider: RouteProviderService, router: Router): boolean {
		if (auth.isLoggedIn) {
			return true
		}

		router.navigate([routeProvider.get('auth:login')])
		return false
	}
}


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return inject(AuthGuardService).canActivate(
		inject(AuthService),
		inject(RouteProviderService),
		inject(Router)
	)
}
