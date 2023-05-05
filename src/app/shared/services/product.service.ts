import { Injectable } from '@angular/core';
import { ProductResource } from "../resources/product.resource"
import { BehaviorSubject, Observable } from "rxjs"
import ProductModel from "../../core/models/product.model"
import ProductAttributModel from "../../core/models/productAttribut.model"
import { SearchTerms } from "../modules/search/search-term.class"
import ModelCollection from "../../core/model-collection.class"

export const SEARCH_PRODUCT_CONTEXT_KEY = "search:product"


@Injectable()
export class ProductService {
	private _productSubject$$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([])
	products$: Observable<ProductModel[]> = this._productSubject$$.asObservable()

	constructor(
		private _productResource: ProductResource
	) {}

	get(id: number): Observable<ProductModel | undefined> {
		return this._productResource.get(id)
	}

	findBy(terms: SearchTerms): Observable<ModelCollection<ProductModel>> {
		return this._productResource.findBy(terms)
	}

	getProductAttrsByCategoryName(product: ProductModel, name: string): ProductAttributModel[] {
		return product.productAttributs.filter(attr => attr.productAttributCategory.name === name)
	}

	getMeanRating(product: ProductModel) {
		return product.productRating.reduce((a, v) => {
			return a + v.rating
		}, 0) / product.productRating.length
	}
}
