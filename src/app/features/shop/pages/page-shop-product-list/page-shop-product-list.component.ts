import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import ProductModel from "../../../../core/models/product.model"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ProductService, SEARCH_PRODUCT_CONTEXT_KEY } from "../../../../shared/services/product.service"
import { CartPayload, CartService } from "../../../../shared/services/cart.service"
import { SearchComponent } from "../../../../shared/modules/search/components/search/search.component"
import { Order, OrderConfigType } from "../../../../shared/components/order/types/order-config.type"
import { ProductAttributCategoryNames, ProductAttributService } from "../../../../shared/services/product-attribut.service"
import { ChoiceOption } from "../../../../shared/modules/search/components/form-elements/select-search/select-search.component"
import { SearchTerms } from "../../../../shared/modules/search/search-term.class"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit, AfterViewInit {
	@ViewChild('search') search: SearchComponent;
	searchContext = SEARCH_PRODUCT_CONTEXT_KEY

	cartPayload: CartPayload

	products: ProductModel[] = []

	orderConfig: OrderConfigType<ProductModel>

	filterSizeChoices: ChoiceOption[] = []
	filterColorChoices: ChoiceOption[] = []

	constructor(
		public productService: ProductService,
		public routeProvider: RouteProviderService,
		private _cartService: CartService,
		private _productAttributService: ProductAttributService
	) {
		this._productAttributService.allGroupByCategoryName().subscribe((attrsByCatergoryName) => {
			this.filterSizeChoices = attrsByCatergoryName[ProductAttributCategoryNames.Size].map((productAttribut): ChoiceOption => {
				return { value: productAttribut.name, label: productAttribut.name }
			})
			this.filterColorChoices = attrsByCatergoryName[ProductAttributCategoryNames.Color].map((productAttribut): ChoiceOption => {
				return { value: productAttribut.name, label: productAttribut.name }
			})
		})

		this.orderConfig = productService.getOrderConfig(() => {
			this.products = this.products.sort((a: any, b: any) => {
				return (this.orderConfig.selectedOrder.toLowerCase() === Order.ASC)
					? a[this.orderConfig.selectedProperty] - b[this.orderConfig.selectedProperty]
					: b[this.orderConfig.selectedProperty] - a[this.orderConfig.selectedProperty]
			})
		})

		this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
		})
	}

	ngOnInit() {
		this.productService.products$.subscribe((products) => {
			this.products = products
		})
	}

	ngAfterViewInit() {
		this.search.changes.subscribe((terms: SearchTerms) => {
			const sizeTerms = terms.get('attrSize')
			const colorTerms = terms.get('attrColor')

			this.productService.findBy(terms).subscribe((products) => {
				this.products = products

				if (sizeTerms) {
					this.products = this.products.filter((product) => {
						return product.productAttributs.some((attr) => sizeTerms.includes(attr.name))
					})
				}

				if (colorTerms) {
					this.products = this.products.filter((product) => {
						return product.productAttributs.some((attr) => colorTerms.includes(attr.name))
					})
				}
				this.orderConfig.sort()
			})
		})
	}
}
