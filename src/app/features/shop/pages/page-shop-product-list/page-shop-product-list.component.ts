import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import ProductModel from "../../../../core/models/product.model"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ProductService, SEARCH_PRODUCT_CONTEXT_KEY } from "../../../../shared/services/product.service"
import { CartPayload, CartService } from "../../../../shared/services/cart.service"
import { SearchComponent } from "../../../../shared/modules/search/components/search/search.component"
import { ProductAttributCategoryNames, ProductAttributService } from "../../../../shared/services/product-attribut.service"
import { ChoiceOption } from "../../../../shared/modules/search/components/form-elements/select-search/select-search.component"
import { SearchTerms } from "../../../../shared/modules/search/search-term.class"
import ModelCollection from "../../../../core/model-collection.class"
import { SubscriptionHelper } from "../../../../core/subscription-helper.class"
import { OrderProperties } from "../../../../shared/modules/search/components/form-elements/order-search/order.type"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('search') private _search: SearchComponent;
	searchContext = SEARCH_PRODUCT_CONTEXT_KEY

	cartPayload: CartPayload

	products: ModelCollection<ProductModel> = new ModelCollection<ProductModel>(ProductModel, null)

	filterSizeChoices: ChoiceOption[] = []
	filterColorChoices: ChoiceOption[] = []

	orderProperties: OrderProperties = [
		{ label: 'Prix', value: 'price', default: true },
		{ label: 'Avis', value: 'averageRating' }
	]

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	private _page = 1
	private _terms: SearchTerms
	private _loading = false

	constructor(
		public productService: ProductService,
		public routeProvider: RouteProviderService,
		private _cartService: CartService,
		private _productAttributService: ProductAttributService
	) {}

	ngOnInit() {
		this._subscriptions.add = this._productAttributService.getAllGroupedByCategoryName$.subscribe((attrsByCatergoryName) => {
			this.filterSizeChoices = attrsByCatergoryName[ProductAttributCategoryNames.Size].map((productAttribut): ChoiceOption => {
				return { value: productAttribut.name, label: productAttribut.name }
			})
			this.filterColorChoices = attrsByCatergoryName[ProductAttributCategoryNames.Color].map((productAttribut): ChoiceOption => {
				return { value: productAttribut.name, label: productAttribut.name }
			})

		})

		this._subscriptions.add = this._cartService.cart$.subscribe((payload) => {
			this.cartPayload = payload
		})

		document.querySelector('#container')!.addEventListener('scroll', this.onScroll.bind(this))
	}

	ngAfterViewInit() {
		this._subscriptions.add = this._search.changes$.subscribe((terms) => {
			this._page = 1
			terms.set('page', this._page)
			this.loadProducts(terms, true)
			document.querySelector('#container')!.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
		document.querySelector('#container')!.removeEventListener('scroll', this.onScroll)
	}

	loadProducts(terms: SearchTerms, reload = false) {
		this._loading = true
		this._terms = terms

		const sizeTerms = terms.get('attrSize')
		const colorTerms = terms.get('attrColor')

		this.productService.findBy(terms).subscribe((products) => {
			if (reload) {
				this.products = products
			} else {
				this.products.push(products)
			}

			if (sizeTerms) {
				this.products.items = this.products.items.filter((product) => {
					return product.productAttributs.some((attr) => sizeTerms.includes(attr.name))
				})
			}

			if (colorTerms) {
				this.products.items = this.products.items.filter((product) => {
					return product.productAttributs.some((attr) => colorTerms.includes(attr.name))
				})
			}

			this._loading = false
		})
	}

	onScroll(e: Event) {
		const element = e.target as HTMLElement;
		const scrollTop = element.scrollTop;
		const scrollHeight = element.scrollHeight;
		const clientHeight = element.clientHeight;

		const percentScrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

		if (this._terms && percentScrolled > 60 && !this._loading) {
			this._page += 1
			this._terms.set('page', this._page)
			this.loadProducts(this._terms)
		}
	}
}
