import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import ProductDto from "../../../../../dto/productDto"
import { ProductService } from "../../product.service"


@Component({
	selector: 'app-page-shop-product-detail',
	templateUrl: './page-shop-product-detail.component.html',
	styleUrls: ['./page-shop-product-detail.component.scss']
})
export class PageShopProductDetailComponent implements OnInit {
	product: ProductDto | undefined

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public productService: ProductService
	) {}

	ngOnInit(): void {
		const id: number = +(this.route.snapshot.paramMap.get('id') ?? -1)

		this.productService.getProductById(id)
			.subscribe((product) => this.product = product)
	}
}
