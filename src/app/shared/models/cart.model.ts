import AbstractModel from "../abstracts/model.abstract"
import UserModel from "./user.model"
import CartItemModel from "./cartItem.model"
import { Type } from "class-transformer"


export default class CartModel extends AbstractModel {
	@Type(() => UserModel)
	user?: UserModel

	@Type(() => CartItemModel)
	items: CartItemModel[] = []

	discountPercentage?: number = 0
}