import { Component, OnInit } from '@angular/core';
import { RouteProviderService } from "./shared/services/route-provider.service"
import { CartPayload, CartService } from "./shared/services/cart.service"
import { TokenStorageService } from "./shared/services/token-storage.service"
import UserModel from "./core/models/user.model"
import { AuthService } from "./shared/services/auth.service"


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	routeProvider: RouteProviderService
	authService: AuthService

	title = 'Clothify';

	user: UserModel | null
	cartPayload: CartPayload

	constructor(
		private _cartService: CartService,
		private _routeProviderService: RouteProviderService,
		private _tokenStorage: TokenStorageService,
		private _authService: AuthService,
	) {
		this.routeProvider = _routeProviderService
		this.authService = _authService

		this._tokenStorage.userToken$.subscribe((userToken) => {
			this.user = (userToken) ? userToken.user : null
		})

		this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
		})
	}

	ngOnInit() {}
}
