import AbstractModel from "../model.abstract"
import ProductModel from "./product.model"
import { Expose, Type } from "class-transformer"
import ProductAttributModel from "./productAttribut.model"


export default class OrderItemModel extends AbstractModel<OrderItemModel> {
	@Expose({ groups: ['get', 'post', 'patch'] })
	@Type(() => ProductModel)
	product: ProductModel | string

	@Expose({ groups: ['get', 'post', 'patch'] })
	quantity: number

	@Expose({ groups: ['get', 'post', 'patch'] })
	totalCost: number

	@Type(() => ProductAttributModel)
	@Expose({ groups: ['get', 'post', 'patch'] })
	productAttributs: ProductAttributModel[] | string[]
}