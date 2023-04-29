import AbstractModel from "../model.abstract"
import ProductModel from "./product.model"
import { Expose, Type } from "class-transformer"
import ProductAttributModel from "./productAttribut.model"


export default class OrderItemModel extends AbstractModel<OrderItemModel> {
	@Expose({ groups: ['get', 'post'] })
	@Type(() => ProductModel)
	product: ProductModel | string

	@Expose({ groups: ['get', 'post'] })
	quantity: number

	@Expose({ groups: ['get', 'post'] })
	totalCost: number

	@Type(() => ProductAttributModel)
	@Expose({ groups: ['get', 'post'] })
	productAttributs: ProductAttributModel[] | string[]
}