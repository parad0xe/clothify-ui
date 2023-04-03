import { Injectable } from '@angular/core';
import ProductModel from "../../models/product.model"
import ProductAttributModel from "../../models/productAttribut.model"
import AbstractApiResource from "../../abstracts/api-resource.abstract"


@Injectable()
export class ProductService extends AbstractApiResource<ProductModel> {
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
