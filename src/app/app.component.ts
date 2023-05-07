import { Component, OnInit } from '@angular/core';
import { RouteProviderService } from "./shared/services/route-provider.service"
import { CartPayload, CartService } from "./shared/services/api/cart.service"
import { TokenStorageService } from "./shared/services/token-storage.service"
import UserModel from "./core/models/user.model"
import { AuthService } from "./shared/services/auth.service"
import { NavigationEnd, Router } from "@angular/router"
import { StorageService } from "./shared/services/storage.service"
import { Location } from "@angular/common"


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	title = 'Clothify';

	user: UserModel | null
	cartPayload: CartPayload

	constructor(
		public routeProvider: RouteProviderService,
		public auth: AuthService,
		private _cartService: CartService,
		private _tokenStorage: TokenStorageService,
		private _router: Router,
		private _storage: StorageService,
		private _location: Location
	) {
		this._tokenStorage.userToken$.subscribe((userToken) => {
			this.user = (userToken) ? userToken.user : null
		})

		this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
		})

		this._router.events.subscribe((event) => {
			if(event instanceof NavigationEnd) {
				this.saveLastUrl()
			}
		})
	}

	ngOnInit() {}

	private saveLastUrl() {
		const urlList = this._storage.get<string[]>("url:list", [])
		const currentUrl = this._location.path(true)

		if(currentUrl !== urlList.at(-1)) {
			const nextUrlList = urlList.slice(-2)
			nextUrlList.push(decodeURIComponent(currentUrl))
			this._storage.save("url:list", nextUrlList)
		}
	}
}
