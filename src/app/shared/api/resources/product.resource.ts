import { Injectable } from '@angular/core';
import ProductModel from "../../../core/models/product.model"
import ProductAttributModel from "../../../core/models/productAttribut.model"
import AbstractApiResource from "../../../core/abstracts/api-resource.abstract"


@Injectable()
export class ProductResource extends AbstractApiResource<ProductModel> {
	protected model = ProductModel

	getProductAttrsByCategoryName(product: ProductModel, name: string): ProductAttributModel[] {
		return product.productAttributs.filter(a => a.productAttributCategory.name === name)
	}

	getMeanRating(product: ProductModel) {
		return product.productRating.reduce((a, v) => {
			return a + v.rating
		}, 0) / product.productRating.length
	}
}
