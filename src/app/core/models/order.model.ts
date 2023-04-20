import AbstractModel from "../http/model.abstract"
import UserModel from "./user.model"
import { Expose, Type } from "class-transformer"
import OrderItemModel from "./orderItem.model"
import AddressModel from "./address.model"


export default class OrderModel extends AbstractModel<OrderModel> {
	@Expose({ groups: ['get', 'post'] })
	reference: string

	@Expose({ groups: ['get', 'post'] })
	totalCost: number = 0

	@Expose({ groups: ['post'] })
	user: UserModel | string

	@Expose({ groups: ['get', 'post'] })
	paymentMethod: ("PAYPAL" | "CB")

	@Expose({ groups: ['get', 'post'] })
	@Type(() => OrderItemModel)
	orderItems: OrderItemModel[]

	@Expose({ groups: ['get', 'post'] })
	@Type(() => AddressModel)
	shippingAddress: AddressModel
}