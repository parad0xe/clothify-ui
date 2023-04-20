import AbstractModel from "../http/model.abstract"
import ProductAttributCategoryModel from "./productAttributCategory.model"
import { Type } from "class-transformer"


export default class ProductAttributModel extends AbstractModel<ProductAttributModel> {
	@Type(() => ProductAttributCategoryModel)
	productAttributCategory: ProductAttributCategoryModel

	name: string
	value: string
}