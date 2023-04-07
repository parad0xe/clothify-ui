import { Component, OnInit } from '@angular/core';
import ProductModel from "../../../../shared/models/product.model"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ProductService } from "../../../../shared/services/product.service"
import { CartService } from "../../../../shared/services/cart.service"
import { map, Observable } from "rxjs"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit {
	productService: ProductService
	cartService: CartService
	routeProvider: RouteProviderService

	products: ProductModel[] = []

	constructor(
		private _productService: ProductService,
		private _cartService: CartService,
		private _routeProvider: RouteProviderService
	) {
		this.productService = _productService
		this.cartService = _cartService
		this.routeProvider = _routeProvider
	}

	ngOnInit() {
		this._productService.products.subscribe((products) => {
			this.products = products
		})
	}
}
