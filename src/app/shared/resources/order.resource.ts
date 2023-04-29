import { Injectable } from '@angular/core';
import AbstractResource from "../../core/resource.abstract"
import OrderModel from "../../core/models/order.model"


@Injectable({
	providedIn: 'root'
})
export class OrderResource extends AbstractResource<OrderModel> {
	protected model = OrderModel
}
