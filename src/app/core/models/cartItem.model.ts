import AbstractModel from "../http/model.abstract"
import UserModel from "./user.model"
import ProductModel from "./product.model"
import ProductAttributModel from "./productAttribut.model"
import { Type } from "class-transformer"
import ProductBrandModel from "./productBrand.model"


export default class CartItemModel extends AbstractModel<CartItemModel> {
	quantity: number = 0

	@Type(() => ProductModel)
	product: ProductModel

	@Type(() => ProductAttributModel)
	productAttributs: ProductAttributModel[] = []
}