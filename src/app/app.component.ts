import { Component, OnInit } from '@angular/core';
import { RouteProviderService } from "./shared/services/route-provider.service"
import { CartService } from "./shared/services/cart.service"
import CartModel from "./shared/models/cart.model"


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	cartService: CartService
	routeProvider: RouteProviderService

	title = 'Clothify';

	constructor(
		private _cartService: CartService,
		private _routeProviderService: RouteProviderService
	) {
		this.cartService = _cartService
		this.routeProvider = _routeProviderService
	}

	ngOnInit() {}
}
