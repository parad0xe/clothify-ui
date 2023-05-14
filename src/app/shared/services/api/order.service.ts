import { Injectable } from '@angular/core';
import { OrderResource } from "../../resources/order.resource"
import OrderModel from "../../../core/models/order.model"
import { CartPayload } from "../cart.service"
import { ApiService } from "./api.service"
import OrderItemModel from "../../../core/models/orderItem.model"
import { Observable } from "rxjs"
import ProductModel from "../../../core/models/product.model"
import ProductAttributModel from "../../../core/models/productAttribut.model"


@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(
		private _orderResource: OrderResource,
		private _api: ApiService
	) { }

	get(reference: string): Observable<OrderModel | undefined> {
		return this._orderResource.get(reference)
	}

	authorizeOrder<R = any>(orderId: string, payload: CartPayload): Observable<R | null> {
		return this._orderResource.postCall<R>(`checkout/paypal/authorize/${orderId}`, (new OrderModel()).load({
			orderItems: payload.cart.items.map((item) => {
				return (new OrderItemModel()).load({
					totalCost: payload.getTotalItemPrice(item),
					product: this._api.getIriOf(ProductModel, item.product.id),
					quantity: item.quantity,
					productAttributs: item.productAttributs.map((attr) => {
						return this._api.getIriOf(ProductAttributModel, attr.id)
					})
				})
			})
		}))
	}
}
