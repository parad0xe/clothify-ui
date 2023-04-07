import { Injectable } from '@angular/core';
import CartModel from "../../models/cart.model"
import { Observable, Subject } from "rxjs"
import { StorageService } from "../storage.service"
import ProductModel from "../../models/product.model"
import ProductAttributModel from "../../models/productAttribut.model"
import CartItemModel from "../../models/cartItem.model"
import { MatSnackBar } from "@angular/material/snack-bar"
import AbstractApiResource from "../../abstracts/api-resource.abstract"
import { ApiService } from "../api.service"
import { HttpClient } from "@angular/common/http"


@Injectable({
	providedIn: 'root'
})
export class CartResource extends AbstractApiResource<CartModel> {
	protected model = CartModel
}
