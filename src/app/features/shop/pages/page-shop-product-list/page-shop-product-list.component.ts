import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import ProductModel from "../../../../core/models/product.model"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ProductService } from "../../../../shared/services/product.service"
import { CartPayload, CartService } from "../../../../shared/services/cart.service"
import { SearchComponent } from "../../../../shared/modules/search/components/search/search.component"
import { ProductAttributCategoryNames, ProductAttributService } from "../../../../shared/services/product-attribut.service"
import { ChoiceOption } from "../../../../shared/modules/search/components/form-elements/select-search/select-search.component"
import ModelCollection from "../../../../core/model-collection.class"
import { SubscriptionHelper } from "../../../../core/subscription-helper.class"
import { OrderProperties } from "../../../../shared/modules/search/components/form-elements/order-search/order.type"
import { SearchContainer } from "../../../../shared/modules/search/search-container.class"
import { SearchService } from "../../../../shared/modules/search/services/search.service"
import { map, Observable, switchMap, tap } from "rxjs"


@Component({
	selector: 'app-page-shop-product-list',
	templateUrl: './page-shop-product-list.component.html',
	styles: []
})
export class PageShopProductListComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('search') private _search: SearchComponent

	cartPayload: CartPayload

	products: ModelCollection<ProductModel> = new ModelCollection<ProductModel>(ProductModel, null)

	filterSizeChoices: ChoiceOption[] = []
	filterColorChoices: ChoiceOption[] = []

	orderProperties: OrderProperties = [
		{ label: 'Prix', value: 'price', default: true },
		{ label: 'Avis', value: 'averageRating' }
	]

	loading = false
	isLastPage = false

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		public routeProvider: RouteProviderService,
		private _productService: ProductService,
		private _cartService: CartService,
		private _productAttributService: ProductAttributService,
		private _searchService: SearchService,
		private _cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this._subscriptions.add = this._productAttributService.allGroupedByCategory$.subscribe((attrsByCategoryName) => {
			if(attrsByCategoryName[ProductAttributCategoryNames.Size]) {
				this.filterSizeChoices = attrsByCategoryName[ProductAttributCategoryNames.Size].map((productAttribut): ChoiceOption => {
					return { value: productAttribut.name, label: productAttribut.name }
				})
			}

			if(attrsByCategoryName[ProductAttributCategoryNames.Color]) {
				this.filterColorChoices = attrsByCategoryName[ProductAttributCategoryNames.Color].map((productAttribut): ChoiceOption => {
					return { value: productAttribut.name, label: productAttribut.name }
				})
			}
		})

		this._subscriptions.add = this._cartService.cart$.subscribe(payload => this.cartPayload = payload)

		document.querySelector("#container")!.addEventListener('scroll', this._onScroll.bind(this))
	}

	ngAfterViewInit() {
		this._subscriptions.add = this._search.firstPage$.pipe(
			tap(() => this._setLoading(true)),
			switchMap((data) => {
				document.querySelector("#container")!.scrollTo({ top: 0, behavior: 'smooth' })
				this.products.clear()
				return this._load(data.terms)
			})
		).subscribe((isLastPage) => {
			this._setLoading(false)
			this.isLastPage = isLastPage
		})

		this._subscriptions.add = this._search.nextPage$.pipe(
			tap(() => this._setLoading(true)),
			switchMap((data) => this._load(data.terms))
		).subscribe((isLastPage) => {
			this._setLoading(false)
			this.isLastPage = isLastPage
		})

		this._subscriptions.add = this._search.filterChanges$.subscribe((terms) => {
			this._setLoading(true)
			this._search.firstPage()
		})
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
		document.querySelector("#container")!.removeEventListener('scroll', this._onScroll.bind(this))
	}

	private _load(terms: SearchContainer): Observable<boolean> {
		return this._productService.findBy(terms).pipe(
			tap((products) => {
				const sizeTerms = terms.get('attrSize')
				const colorTerms = terms.get('attrColor')

				if (products.items.length > 0) {
					this.products.push(products)

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
				}
			}),
			map((products) => products.isLastPage)
		)
	}

	private _onScroll(e: Event) {
		if (this.loading || this.isLastPage) {
			return
		}

		const element = e.target as HTMLElement
		const scrollTop = element.scrollTop
		const scrollHeight = element.scrollHeight
		const clientHeight = element.clientHeight

		const percentScrolled = (scrollTop / (scrollHeight - clientHeight)) * 100

		if (percentScrolled > 60) {
			this._setLoading(true)
			this._search.nextPage()
		}
	}

	private _setLoading(isLoading: boolean) {
		this.loading = isLoading
		this._cdr.detectChanges()
	}
}
