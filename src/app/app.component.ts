import { Component, OnInit } from '@angular/core';
import { RouteProviderService } from "./shared/services/route-provider.service"
import { CartService } from "./shared/services/cart.service"
import { TokenStorageService } from "./shared/services/token-storage.service"
import UserModel from "./core/models/user.model"
import { AuthService } from "./shared/services/auth.service"


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	cartService: CartService
	routeProvider: RouteProviderService
	authService: AuthService

	title = 'Clothify';

	user: UserModel | null

	constructor(
		private _cartService: CartService,
		private _routeProviderService: RouteProviderService,
		private _tokenStorage: TokenStorageService,
		private _authService: AuthService,
	) {
		this.cartService = _cartService
		this.routeProvider = _routeProviderService
		this.authService = _authService
	}

	ngOnInit() {
		this._tokenStorage.userToken$.subscribe((userToken) => {
			this.user = (userToken) ? userToken.user : null
		})
	}
}
