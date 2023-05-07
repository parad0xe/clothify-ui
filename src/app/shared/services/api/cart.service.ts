import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
import { MatSnackBar } from "@angular/material/snack-bar"
import CartModel from "../../../core/models/cart.model"
import { StorageService } from "../storage.service"
import ProductAttributModel from "../../../core/models/productAttribut.model"
import CartItemModel from "../../../core/models/cartItem.model"
import ProductModel from "../../../core/models/product.model"

export type CartPayload = {
	cart: CartModel,
	findItemIndex: (product: ProductModel) => number | undefined,
	getTotalPrice: () => number,
	getTotalItemNumber: () => number,
	findItem: (product: ProductModel) => CartItemModel | undefined,
	getItemQuantity: (product: ProductModel) => number | undefined,
	hasItemQuantity: (product: ProductModel) => boolean,
	getTotalItemPrice: (item: CartItemModel) => number
}


@Injectable({
	providedIn: 'root'
})
export class CartService {
	private _STORAGE_KEY = "storage:cart"

	private _payload: CartPayload = {
		cart: new CartModel(),

		findItemIndex: function (product: ProductModel): number | undefined {
			const index = this.cart.items.findIndex(item => item.product.id === product.id)
			return (index !== -1) ? index : undefined
		},

		getTotalPrice: function (): number {
			return this.cart.items.reduce(
				(a, item) => +(a + item.product.price * item.quantity).toFixed(2), 0
			)
		},

		getTotalItemNumber: function (): number {
			return this.cart.items.reduce(
				(a, item) => a + item.quantity, 0
			)
		},

		findItem: function (product: ProductModel): CartItemModel | undefined {
			return this.cart.items.find(item => item.product.id === product.id)
		},

		getItemQuantity: function (product: ProductModel): number | undefined {
			const item = this.findItem(product)
			return (item !== undefined) ? item.quantity : undefined
		},

		hasItemQuantity: function (product: ProductModel): boolean {
			return (this.getItemQuantity(product) ?? 0) > 0
		},

		getTotalItemPrice: function (item: CartItemModel): number {
			return +(item.product.price * item.quantity).toFixed(2)
		}
	}

	private _cartSubject$$: BehaviorSubject<CartPayload> = new BehaviorSubject<CartPayload>(this._payload)
	cart$ = this._cartSubject$$.asObservable()

	constructor(
		private _snackBar: MatSnackBar,
		private _storage: StorageService
	) {
		this._payload.cart = this._storage.get(this._STORAGE_KEY, new CartModel())
		this._cartSubject$$.next(this._payload)
	}

	add(product: ProductModel, attributs: ProductAttributModel[]) {
		const itemIndex = this._payload.findItemIndex(product)

		if (itemIndex === undefined) {
			const item = (new CartItemModel()).load({
				quantity: 1,
				product: product,
				productAttributs: attributs
			})
			this._payload.cart.items.push(item)
		} else {
			this._payload.cart.items[itemIndex].quantity++
		}

		this.save()

		this._snackBar.open('Produit ajouté avec succès', 'OK', {
			horizontalPosition: "center",
			verticalPosition: "bottom",
			duration: 5000
		});
	}

	decrease(product: ProductModel) {
		const itemIndex = this._payload.findItemIndex(product)

		if (itemIndex === undefined)
			return

		this._payload.cart.items[itemIndex].quantity--

		if (this._payload.cart.items[itemIndex].quantity <= 0) {
			this._payload.cart.items = this._payload.cart.items.filter(item => item.product.id !== product.id)
		}

		this.save()

		this._snackBar.open('Produit mis à jour avec succès', 'OK', {
			horizontalPosition: "center",
			verticalPosition: "bottom",
			duration: 5000
		});
	}

	remove(product: ProductModel) {
		const itemIndex = this._payload.findItemIndex(product)

		if (itemIndex === undefined)
			return

		this._payload.cart.items = this._payload.cart.items.filter(item => item.product.id !== product.id)

		this.save()

		this._snackBar.open('Produit retiré avec succès', 'OK', {
			horizontalPosition: "center",
			verticalPosition: "bottom",
			duration: 5000
		});
	}

	clear() {
		this._payload.cart = new CartModel()
		this.save()
	}

	private save() {
		this._cartSubject$$.next(this._payload)
		this._storage.save(this._STORAGE_KEY, this._payload.cart)
	}
}
