
import AbstractModel from "../abstracts/model.abstract"
import ProductBrandModel from "./productBrand.model"
import ProductRatingModel from "./productRating.model"
import ProductCategoryModel from "./productCategory.model"
import ProductCollectionModel from "./productCollection.model"
import ProductAttributModel from "./productAttribut.model"
import { Type } from "class-transformer"


export default class ProductModel extends AbstractModel<ProductModel> {
	name: string
	description: string
	price: number
	quantity: number
	weight: number
	imageUrl: string
	isAvailable: boolean
	isNew: boolean

	@Type(() => ProductBrandModel)
	brand: ProductBrandModel

	@Type(() => ProductCollectionModel)
	collection: ProductCollectionModel

	@Type(() => ProductCategoryModel)
	category: ProductCategoryModel

	@Type(() => ProductAttributModel)
	productAttributs: ProductAttributModel[]

	@Type(() => ProductRatingModel)
	productRating: ProductRatingModel[]
}