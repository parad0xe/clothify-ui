import { Injectable } from '@angular/core';
import ProductModel from "../../core/models/product.model"
import ProductAttributModel from "../../core/models/productAttribut.model"
import AbstractResource from "../../core/abstracts/resource.abstract"


@Injectable()
export class ProductResource extends AbstractResource<ProductModel> {
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
