import { Injectable } from '@angular/core';
import { ProductResource } from "../../resources/product.resource"
import { Observable } from "rxjs"
import ProductModel from "../../../core/models/product.model"
import ProductAttributModel from "../../../core/models/productAttribut.model"
import ModelCollection from "../../../core/model-collection.class"
import { SearchContainer } from "../../modules/search/search-container.class"


@Injectable()
export class ProductService {
	constructor(
		private _productResource: ProductResource
	) {}

	get(id: number): Observable<ProductModel | undefined> {
		return this._productResource.get(id)
	}

	findBy(terms: SearchContainer): Observable<ModelCollection<ProductModel>> {
		return this._productResource.findBy(terms)
	}

	getProductAttrsByCategoryName(product: ProductModel, name: string): ProductAttributModel[] {
		return product.productAttributs.filter(attr => attr.productAttributCategory.name === name)
	}
}
