import AbstractModel from "../abstracts/model.abstract"
import UserModel from "./user.model"
import ProductModel from "./product.model"
import ProductAttributModel from "./productAttribut.model"
import { Type } from "class-transformer"
import ProductBrandModel from "./productBrand.model"


export default class CartProductModel extends AbstractModel {
	quantity: number = 0

	@Type(() => ProductModel)
	product: ProductModel

	@Type(() => ProductAttributModel)
	productAttributs: ProductAttributModel[] = []
}