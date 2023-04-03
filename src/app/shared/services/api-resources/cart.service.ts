import { Injectable } from '@angular/core';
import CartModel from "../../models/cart.model"
import { Observable, Subject } from "rxjs"
import { StorageService } from "../storage.service"
import ProductModel from "../../models/product.model"
import ProductAttributModel from "../../models/productAttribut.model"
import CartProductModel from "../../models/cartProduct.model"
import { MatSnackBar } from "@angular/material/snack-bar"
import AbstractApiResource from "../../abstracts/api-resource.abstract"
import { ApiService } from "../api.service"
import { HttpClient } from "@angular/common/http"


@Injectable({
	providedIn: 'root'
})
export class CartService extends AbstractApiResource<CartModel> {
	protected model = CartModel

	static CART_STORAGE_KEY = "storage:cart"

	cart: CartModel

	cartObserver: Observable<CartModel> = new Observable<CartModel>()
	cartListener: Subject<CartModel> = new Subject<CartModel>()

	constructor(
		private snackBar: MatSnackBar,
		private storage: StorageService,
		private _api: ApiService,
		protected _http: HttpClient
	) {
		super(_api, _http)

		// if user.isLogged
		let cartData = this.storage.get(CartService.CART_STORAGE_KEY)

		this.cart = (cartData !== null)
			? (new CartModel()).load(cartData)
			: new CartModel()

		this.cartObserver = new Observable((observer) => {
			observer.next(this.cart)
		})
	}

	add(product: ProductModel, attributs: ProductAttributModel[]) {
		const itemIndex = this.getCartItemIndex(product)

		if (itemIndex === undefined) {
			const item = (new CartProductModel()).load({
				quantity: 1,
				product: product,
				productAttributs: attributs
			})
			this.cart.cartProducts.push(item)
		} else {
			this.cart.cartProducts[itemIndex].quantity++
		}

		this.storage.save(CartService.CART_STORAGE_KEY, this.cart)

		this.cartListener.next(this.cart)

		this.snackBar.open('Produit ajouté avec succès', 'OK', {
			horizontalPosition: "center",
			verticalPosition: "bottom",
			duration: 5000
		});
	}

	decrease(product: ProductModel) {
		const itemIndex = this.getCartItemIndex(product)

		if (itemIndex === undefined)
			return

		this.cart.cartProducts[itemIndex].quantity--

		if (this.cart.cartProducts[itemIndex].quantity <= 0) {
			this.cart.cartProducts = this.cart.cartProducts.filter(item => item.product.id !== product.id)
		}

		this.storage.save(CartService.CART_STORAGE_KEY, this.cart)

		this.cartListener.next(this.cart)

		this.snackBar.open('Produit mis à jour avec succès', 'OK', {
			horizontalPosition: "center",
			verticalPosition: "bottom",
			duration: 5000
		});
	}

	remove(product: ProductModel) {
		const itemIndex = this.getCartItemIndex(product)

		if (itemIndex === undefined)
			return

		this.cart.cartProducts = this.cart.cartProducts.filter(item => item.product.id !== product.id)

		this.storage.save(CartService.CART_STORAGE_KEY, this.cart)

		this.cartListener.next(this.cart)

		this.snackBar.open('Produit retiré avec succès', 'OK', {
			horizontalPosition: "center",
			verticalPosition: "bottom",
			duration: 5000
		});
	}

	getCartItemIndex(product: ProductModel): number | undefined {
		const index = this.cart.cartProducts.findIndex(cartProduct => cartProduct.product.id === product.id)
		return (index !== -1) ? index : undefined
	}

	getCartItem(product: ProductModel): CartProductModel | undefined {
		return this.cart.cartProducts.find(cartProduct => cartProduct.product.id === product.id)
	}

	getQuantityOf(product: ProductModel): number | null {
		const item = this.getCartItem(product)
		return (item !== undefined) ? item.quantity : null
	}

	getTotalProductNumber(): number {
		return this.cart.cartProducts.reduce((a, item) => a + item.quantity, 0)
	}

	getTotal(): number {
		return this.cart.cartProducts
			.reduce((a, cartProduct) => +(a + cartProduct.product.price * cartProduct.quantity).toFixed(2), 0)
	}

	getPriceOf(cartItem: CartProductModel): number {
		return +(cartItem.product.price * cartItem.quantity).toFixed(2)
	}
}
