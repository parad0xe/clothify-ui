import { Component, ViewChild } from '@angular/core';
import { CartService } from "../../shared/services/api-resources/cart.service"
import CartProductModel from "../../shared/models/cartProduct.model"
import { RouteProviderService } from "../../shared/services/route-provider.service"
import { MatTable } from "@angular/material/table"


@Component({
	selector: 'app-page-cart-detail',
	templateUrl: './page-cart-detail.component.html',
	styleUrls: ['./page-cart-detail.component.scss']
})
export class PageCartDetailComponent {
	CartProductModel: typeof CartProductModel = CartProductModel

	dataSource: CartProductModel[]
	displayedColumns = ['counter', 'image', 'actions', 'price', 'action:remove']

	@ViewChild(MatTable) table: MatTable<CartProductModel>;

	constructor(
		protected cartService: CartService,
		protected routeProvider: RouteProviderService
	) {
		this.cartService.cartObserver.subscribe((cart) => {
			this.dataSource = cart.cartProducts
		})

		this.cartService.cartListener.subscribe((cart) => {
			this.dataSource = cart.cartProducts
		})
	}

	increaseItemQuantity(cartItem: CartProductModel) {
		this.cartService.add(cartItem.product, cartItem.productAttributs)
	}

	decreaseItemQuantity(cartItem: CartProductModel) {
		this.cartService.decrease(cartItem.product)
		this.table.renderRows()
	}

	removeItem(cartItem: CartProductModel) {
		this.cartService.remove(cartItem.product)
		this.table.renderRows()
	}
}
