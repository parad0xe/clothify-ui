import { Component, OnInit } from '@angular/core';
import { RouteProviderService } from "./shared/services/route-provider.service"
import { CartService } from "./shared/services/api-resources/cart.service"
import CartModel from "./shared/models/cart.model"


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	title = 'Clothify';

	cart: CartModel = new CartModel()

	constructor(
		protected cartService: CartService,
		protected routeProvider: RouteProviderService
	) {}

	ngOnInit() {
		this.cartService.cartObserver.subscribe((cart) => {
			this.cart = cart
		})
	}
}
