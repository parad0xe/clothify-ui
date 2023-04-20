import AbstractModel from "../http/model.abstract"
import ProductBrandModel from "./productBrand.model"
import ProductRatingModel from "./productRating.model"
import ProductCategoryModel from "./productCategory.model"
import ProductCollectionModel from "./productCollection.model"
import ProductAttributModel from "./productAttribut.model"
import { Expose, Type } from "class-transformer"


export default class ProductModel extends AbstractModel<ProductModel> {
	@Expose({ groups: ['get', 'post'] })
	name: string

	@Expose({ groups: ['get', 'post'] })
	description: string

	@Expose({ groups: ['get', 'post'] })
	price: number

	@Expose({ groups: ['get', 'post'] })
	quantity: number

	@Expose({ groups: ['get', 'post'] })
	weight: number

	@Expose({ groups: ['get', 'post'] })
	imageUrl: string

	@Expose({ groups: ['get', 'post'] })
	isAvailable: boolean

	@Expose({ groups: ['get', 'post'] })
	isNew: boolean

	@Type(() => ProductBrandModel)
	@Expose({ groups: ['get', 'post'] })
	brand: ProductBrandModel

	@Type(() => ProductCollectionModel)
	@Expose({ groups: ['get', 'post'] })
	collection: ProductCollectionModel

	@Type(() => ProductCategoryModel)
	@Expose({ groups: ['get', 'post'] })
	category: ProductCategoryModel

	@Type(() => ProductAttributModel)
	@Expose({ groups: ['get', 'post'] })
	productAttributs: ProductAttributModel[]

	@Type(() => ProductRatingModel)
	@Expose({ groups: ['get', 'post'] })
	productRating: ProductRatingModel[]
}