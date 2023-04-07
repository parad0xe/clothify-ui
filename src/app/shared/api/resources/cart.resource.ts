import { Injectable } from '@angular/core';
import CartModel from "../../../core/models/cart.model"
import { Observable, Subject } from "rxjs"
import { StorageService } from "../../services/storage.service"
import ProductModel from "../../../core/models/product.model"
import ProductAttributModel from "../../../core/models/productAttribut.model"
import CartItemModel from "../../../core/models/cartItem.model"
import { MatSnackBar } from "@angular/material/snack-bar"
import AbstractApiResource from "../../../core/abstracts/api-resource.abstract"
import { ApiService } from "../../services/api.service"
import { HttpClient } from "@angular/common/http"


@Injectable({
	providedIn: 'root'
})
export class CartResource extends AbstractApiResource<CartModel> {
	protected model = CartModel
}
