import { Injectable } from '@angular/core';
import CartModel from "../../core/models/cart.model"
import AbstractResource from "../../core/abstracts/resource.abstract"


@Injectable({
	providedIn: 'root'
})
export class CartResource extends AbstractResource<CartModel> {
	protected model = CartModel
}
