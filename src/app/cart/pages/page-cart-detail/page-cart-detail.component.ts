import { Component, OnInit, ViewChild } from '@angular/core';
import CartItemModel from "../../../shared/models/cartItem.model"
import { RouteProviderService } from "../../../shared/services/route-provider.service"
import { MatTable } from "@angular/material/table"
import { CartService } from "../../../shared/services/cart.service"


@Component({
	selector: 'app-page-cart-detail',
	templateUrl: './page-cart-detail.component.html',
	styleUrls: ['./page-cart-detail.component.scss']
})
export class PageCartDetailComponent implements OnInit {
	cartService: CartService
	routeProvider: RouteProviderService

	CartItemModel: typeof CartItemModel = CartItemModel

	dataSource: CartItemModel[]
	displayedColumns = ['counter', 'image', 'actions', 'price', 'action:remove']

	@ViewChild(MatTable, { static: false }) table: MatTable<CartItemModel>;

	constructor(
		private _cartService: CartService,
		private _routeProvider: RouteProviderService
	) {
		this.cartService = _cartService
		this.routeProvider = _routeProvider
	}

	ngOnInit() {
		this.cartService.cart$.subscribe((payload) => {
			this.dataSource = payload.cart.items

			if (this.table) {
				this.table.renderRows()
			}
		})
	}

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
