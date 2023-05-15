import { Injectable } from '@angular/core';
import { ProductAttributResource } from "../../resources/product-attribut.resource"
import { concatAll, groupBy, map, mergeMap, Observable, reduce, toArray } from "rxjs"
import ProductAttributModel from "../../../core/models/productAttribut.model"

export enum ProductAttributCategoryNames {
	Size = 'taille',
	Color = 'couleur'
}


export type ProductAttributsByCategoryNameType = { [key in ProductAttributCategoryNames]?: ProductAttributModel[] }


@Injectable({
	providedIn: 'root'
})
export class ProductAttributService {

	constructor(
		private _productAttributResource: ProductAttributResource
	) { }

	/**
	 * Récupère tous les attributs groupés par catégorie
	 */
	get allGroupedByCategory$(): Observable<ProductAttributsByCategoryNameType> {
		return this._productAttributResource.all().pipe(
			map((collection) => collection.items),
			concatAll(),
			groupBy((productAttribut) => productAttribut.productAttributCategory.name),
			mergeMap(group => group.pipe(toArray())),
			reduce<ProductAttributModel[], ProductAttributsByCategoryNameType>((groupedAttributs, productAttributs) => {
				const categoryName = productAttributs[0].productAttributCategory.name.toLowerCase() as ProductAttributCategoryNames
				groupedAttributs[categoryName] = productAttributs
				return groupedAttributs
			}, {})
		)
	}
}
