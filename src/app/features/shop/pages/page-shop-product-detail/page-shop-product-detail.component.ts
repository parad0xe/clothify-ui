import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import ProductModel from "../../../../core/models/product.model"
import { ProductService } from "../../../../shared/services/api/product.service"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"


@Component({
	selector: 'app-page-shop-product-detail',
	templateUrl: './page-shop-product-detail.component.html',
	styleUrls: ['./page-shop-product-detail.component.scss']
})
export class PageShopProductDetailComponent implements OnInit, OnDestroy {
	product: ProductModel

	specificationsData: Array<object>

	displayedColumns: string[] = ['specificationName', 'specificationValue']

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		private _route: ActivatedRoute,
		private _productService: ProductService
	) {}

	ngOnInit(): void {
		const id: number = +(this._route.snapshot.paramMap.get('id') ?? -1)

		this._subscriptions.add = this._productService.get(id).subscribe((product) => {
			if (product === undefined)
				return

			this.product = product

			this.specificationsData = [
				{ name: "Marque", value: product.brand.name },
				{ name: "Catégorie", value: product.category.name },
				{ name: "Collection", value: product.collection.name },
				{ name: "Poids", value: `${product.weight} kg` }
			]
		})
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}
}
