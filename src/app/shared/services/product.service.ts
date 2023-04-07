import { Injectable } from '@angular/core';
import { ProductResource } from "./api-resources/product.resource"
import { Observable, of } from "rxjs"
import ProductModel from "../models/product.model"
import ProductAttributModel from "../models/productAttribut.model"


@Injectable()
export class ProductService {
	products: Observable<ProductModel[]>

	constructor(productResource: ProductResource) {
		this.products = productResource.all()
	}

	get(id: number): Observable<ProductModel> {
		return new Observable((observer) => {
			this.products.subscribe((products) => {
				observer.next(products.find(product => product.id === id))
				observer.complete()
			})
		})
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
