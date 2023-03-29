import { Component, OnInit } from '@angular/core';
import ProductDto from "../../../../../dto/productDto"
import { ProductService } from "../../product.service"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit {
	products: ProductDto[] = []

	constructor(public productService: ProductService) {}

	ngOnInit() {
		this.productService.getProducts()
			.subscribe((products) => this.products = products)
	}
}
