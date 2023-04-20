import { Component, OnInit } from '@angular/core';
import ProductModel from "../../../../core/models/product.model"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ProductService } from "../../../../shared/services/product.service"
import { CartPayload, CartService } from "../../../../shared/services/cart.service"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit {
	cartPayload: CartPayload

	products: ProductModel[] = []

	constructor(
		public productService: ProductService,
		public routeProvider: RouteProviderService,
		private _cartService: CartService
	) {
		this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
		})
	}

	ngOnInit() {
		this.productService.products$.subscribe((products) => {
			this.products = products
		})
	}
}
