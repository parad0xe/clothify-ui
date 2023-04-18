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
	productService: ProductService
	routeProvider: RouteProviderService

	cartPayload: CartPayload

	products: ProductModel[] = []

	constructor(
		private _productService: ProductService,
		private _cartService: CartService,
		private _routeProvider: RouteProviderService
	) {
		this.productService = _productService
		this.routeProvider = _routeProvider

		this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
		})
	}

	ngOnInit() {
		this._productService.products.subscribe((products) => {
			this.products = products
		})
	}
}
