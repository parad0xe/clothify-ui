import { Injectable } from '@angular/core';
import { BehaviorSubject, debounce, delay, first, map, Observable, of, switchMap, take, tap, timer } from "rxjs"
import { MatSnackBar } from "@angular/material/snack-bar"
import CartModel from "../../core/models/cart.model"
import { StorageService } from "./storage.service"
import ProductAttributModel from "../../core/models/productAttribut.model"
import CartItemModel from "../../core/models/cartItem.model"
import ProductModel from "../../core/models/product.model"
import { AuthService } from "./auth.service"

type CartPayload = {
	cart: CartModel,
	total: () => number,
	totalItems: () => number,
	findItem: (product: ProductModel) => CartItemModel | undefined,
	findItemIndex: (product: ProductModel) => number | undefined,
	getQuantity: (product: ProductModel) => number | undefined
	hasQuantity: (product: ProductModel) => boolean
}


@Injectable({
	providedIn: 'root'
})
export class CartService {
	STORAGE_KEY = "storage:cart"

	private payload: CartPayload = {
		cart: new CartModel(),
		total: function () {
			return this.cart.items.reduce(
				(a, item) => +(a + item.product.price * item.quantity).toFixed(2), 0
			)
		},
		totalItems: function() {
			return this.cart.items.reduce(
				(a, item) => a + item.quantity, 0
			)
		},
		findItem: function (product: ProductModel): CartItemModel | undefined {
			return this.cart.items.find(item => item.product.id === product.id)
		},
		findItemIndex: function (product: ProductModel): number | undefined {
			const index = this.cart.items.findIndex(item => item.product.id === product.id)
			return (index !== -1) ? index : undefined
		},
		getQuantity: function (product: ProductModel): number | undefined {
			const item = this.findItem(product)
			return (item !== undefined) ? item.quantity : undefined
		},
		hasQuantity: function(product: ProductModel): boolean {
			return (this.getQuantity(product) ?? 0) > 0
		}
	}

	private cartSubject: BehaviorSubject<CartPayload> = new BehaviorSubject<CartPayload>(this.payload)

	cart$: Observable<CartPayload> = this.cartSubject.asObservable()

	constructor(
		private snackBar: MatSnackBar,
		private storage: StorageService,
		private auth: AuthService
	) {
		this.auth.user$.subscribe((user) => {
			if (user) {
				let cartData = this.storage.get(this.STORAGE_KEY)

				const cart = (cartData !== null)
					? (new CartModel()).load(cartData)
					: new CartModel()

				of(cart).pipe(
					delay(1000)
				).subscribe((cart) => {
					this.payload.cart = cart
					this.cartSubject.next(this.payload)
				})
			}
		})
	}

	getPriceOf(cartItem: CartItemModel): number {
		return +(cartItem.product.price * cartItem.quantity).toFixed(2)
	}

	add(product: ProductModel, attributs: ProductAttributModel[]) {
		this.cart$.pipe(first()).subscribe((payload) => {
			const itemIndex = payload.findItemIndex(product)

			if (itemIndex === undefined) {
				const item = (new CartItemModel()).load({
					quantity: 1,
					product: product,
					productAttributs: attributs
				})
				this.payload.cart.items.push(item)
			} else {
				this.payload.cart.items[itemIndex].quantity++
			}

			this.save()

			this.snackBar.open('Produit ajouté avec succès', 'OK', {
				horizontalPosition: "center",
				verticalPosition: "bottom",
				duration: 5000
			});
		})
	}

	decrease(product: ProductModel) {
		this.cart$.pipe(first()).subscribe((payload) => {
			const itemIndex = payload.findItemIndex(product)

			if (itemIndex === undefined)
				return

			this.payload.cart.items[itemIndex].quantity--

			if (this.payload.cart.items[itemIndex].quantity <= 0) {
				this.payload.cart.items = this.payload.cart.items.filter(item => item.product.id !== product.id)
			}

			this.save()

			this.snackBar.open('Produit mis à jour avec succès', 'OK', {
				horizontalPosition: "center",
				verticalPosition: "bottom",
				duration: 5000
			});
		})
	}

	remove(product: ProductModel) {
		this.cart$.pipe(first()).subscribe((payload) => {
			const itemIndex = payload.findItemIndex(product)

			if (itemIndex === undefined)
				return

			this.payload.cart.items = this.payload.cart.items.filter(item => item.product.id !== product.id)

			this.save()

			this.snackBar.open('Produit retiré avec succès', 'OK', {
				horizontalPosition: "center",
				verticalPosition: "bottom",
				duration: 5000
			});
		})
	}

	clear() {
		this.payload.cart = new CartModel()
		this.save()
	}

	private save() {
		this.cartSubject.next(this.payload)
		this.storage.save(this.STORAGE_KEY, this.payload.cart)
	}
}
