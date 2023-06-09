import AbstractModel from "../model.abstract"
import ProductModel from "./product.model"
import ProductAttributModel from "./productAttribut.model"
import { Type } from "class-transformer"


export default class CartItemModel extends AbstractModel<CartItemModel> {
	quantity: number = 0

	@Type(() => ProductModel)
	product: ProductModel

	@Type(() => ProductAttributModel)
	productAttributs: ProductAttributModel[] = []
}