import { Injectable } from '@angular/core';
import { ProductAttributResource } from "../resources/product-attribut.resource"
import { concatAll, groupBy, map, mergeMap, Observable, reduce, toArray } from "rxjs"
import ProductAttributModel from "../../core/models/productAttribut.model"

export type ProductAttributsByCategoryNameType = { [key: string]: ProductAttributModel[] }


export enum ProductAttributCategoryNames {
	Size = 'taille',
	Color = 'couleur'
}


@Injectable({
	providedIn: 'root'
})
export class ProductAttributService {

	constructor(
		private _productAttributResource: ProductAttributResource
	) { }

	get getAllGroupedByCategoryName$(): Observable<ProductAttributsByCategoryNameType> {
		return this._productAttributResource.all().pipe(
			map((collection) => collection.items),
			concatAll(),
			groupBy((productAttribut) => productAttribut.productAttributCategory.name),
			mergeMap(group => group.pipe(toArray())),
			reduce<ProductAttributModel[], ProductAttributsByCategoryNameType>((a, productAttributs) => {
				const categoryName = productAttributs[0].productAttributCategory.name.toLowerCase()
				a[categoryName] = productAttributs
				return a
			}, {})
		)
	}
}
