import { Component, OnInit, ViewChild } from '@angular/core';
import CartItemModel from "../../../../core/models/cartItem.model"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { MatTable } from "@angular/material/table"
import { CartPayload, CartService } from "../../../../shared/services/cart.service"


@Component({
	selector: 'app-page-cart-detail',
	templateUrl: './page-cart-detail.component.html',
	styleUrls: ['./page-cart-detail.component.scss']
})
export class PageCartDetailComponent implements OnInit {
	CartItemModel: typeof CartItemModel = CartItemModel

	cartPayload: CartPayload

	dataSource: CartItemModel[]
	displayedColumns = ['counter', 'image', 'actions', 'price', 'action:remove']

	@ViewChild(MatTable) table: MatTable<CartItemModel>;

	constructor(
		public routeProvider: RouteProviderService,
		private _cartService: CartService
	) {
		this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
			this.dataSource = payload.cart.items

			if (this.table) {
				this.table.renderRows()
			}
		})
	}

	ngOnInit() {}

	increaseItemQuantity(cartItem: CartItemModel) {
		this._cartService.add(cartItem.product, cartItem.productAttributs)
	}

	decreaseItemQuantity(cartItem: CartItemModel) {
		this._cartService.decrease(cartItem.product)
	}

	removeItem(cartItem: CartItemModel) {
		this._cartService.remove(cartItem.product)
	}
}
