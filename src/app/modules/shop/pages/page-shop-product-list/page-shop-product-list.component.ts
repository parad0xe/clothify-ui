import { Component, OnInit } from '@angular/core';
import ProductModel from "../../../../shared/models/product.model"
import { ProductService } from "../../../../shared/services/api-resources/product.service"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { CartService } from "../../../../shared/services/api-resources/cart.service"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit {
	products: ProductModel[] = []

	constructor(
		protected productService: ProductService,
		protected cartService: CartService,
		protected routeProvider: RouteProviderService
	) {}

	ngOnInit() {
		this.productService.all()
			.subscribe((products) => this.products = products)
	}
}
