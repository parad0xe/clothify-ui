import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { CartService } from "../services/api/cart.service"
import { RouteProviderService } from "../services/route-provider.service"


@Injectable()
export class CartHasItemService {
	canActivate(cartService: CartService, routeProvider: RouteProviderService, router: Router): Observable<boolean> {
		return new Observable<boolean>((observer) => {
			cartService.cart$.subscribe((payload) => {
				const hasItem = payload.getTotalItemNumber() > 0

				if(!hasItem) {
					router.navigate([routeProvider.get('shop:product:list')])
				}

				observer.next(hasItem)
				observer.complete()
			})
		})
	}

}


export const CartHasItemGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return inject(CartHasItemService).canActivate(
		inject(CartService),
		inject(RouteProviderService),
		inject(Router)
	)
}
