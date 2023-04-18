import { Injectable } from '@angular/core';
import { OrderResource } from "../resources/order.resource"
import OrderModel from "../../core/models/order.model"
import { CartPayload } from "./cart.service"
import UserModel from "../../core/models/user.model"
import { ApiService } from "./api.service"
import OrderItemModel from "../../core/models/orderItem.model"
import { Observable } from "rxjs"
import ProductModel from "../../core/models/product.model"
import ProductAttributModel from "../../core/models/productAttribut.model"


@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(
		private orderResource: OrderResource,
		private api: ApiService
	) { }

	createOrder(user: UserModel, payload: CartPayload, reference: string): Observable<OrderModel | undefined> {
		const order = (new OrderModel()).load({
			totalCost: payload.getTotalPrice(),
			paymentMethod: 'PAYPAL',
			shippingAddress: user.deliveryAddress,
			user: this.api.getIriOf(UserModel, user.id),
			reference: reference,
			orderItems: payload.cart.items.map((item) => {
				return (new OrderItemModel()).load({
					totalCost: payload.getTotalItemPrice(item),
					product: this.api.getIriOf(ProductModel, item.product.id),
					quantity: item.quantity,
					productAttributs: item.productAttributs.map((attr) => {
						return this.api.getIriOf(ProductAttributModel, attr.id)
					})
				})
			})
		})

		return this.orderResource.post(order)
	}
}
