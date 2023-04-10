import AbstractModel from "../abstracts/model.abstract"
import ProductAttributCategoryModel from "./productAttributCategory.model"
import { Type } from "class-transformer"
import ProductBrandModel from "./productBrand.model"


export default class ProductAttributModel extends AbstractModel<ProductAttributModel> {
	@Type(() => ProductAttributCategoryModel)
	productAttributCategory: ProductAttributCategoryModel

	name: string
	value: string
}