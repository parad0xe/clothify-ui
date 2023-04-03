import AbstractModel from "../abstracts/model.abstract"
import UserModel from "./user.model"
import CartProductModel from "./cartProduct.model"
import { Type } from "class-transformer"
import ProductBrandModel from "./productBrand.model"


export default class CartModel extends AbstractModel {
	@Type(() => UserModel)
	user?: UserModel

	@Type(() => CartProductModel)
	cartProducts: CartProductModel[] = []

	discountPercentage?: number = 0
}