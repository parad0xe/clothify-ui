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
import UserModel from "../../models/user.model"
import AddressModel from "../../models/address.model"

type UserData = {
	firstname: string
	lastname: string
	email: string
	phone: string
}

@Injectable({
	providedIn: 'root'
})
export class UserResource extends AbstractApiResource<UserModel> {
	protected model = UserModel

	static USER_STORAGE_KEY = "storage:user"

	user: UserModel

	userObserver: Observable<UserModel> = new Observable<UserModel>()
	userListener: Subject<UserModel> = new Subject<UserModel>()

	constructor(
		private storage: StorageService,
		private _api: ApiService,
		protected _http: HttpClient
	) {
		super(_api, _http)

		let userData = this.storage.get(UserResource.USER_STORAGE_KEY)

		this.user = (userData !== null)
			? (new UserModel()).load(userData)
			: new UserModel()

		this.userObserver = new Observable((observer) => {
			observer.next(this.user)
		})
	}

	setUserData(data: UserData) {
		this.user.firstname = data.firstname
		this.user.lastname = data.lastname
		this.user.email = data.email
		this.user.phone = data.phone

		this.storage.save(UserResource.USER_STORAGE_KEY, this.user)
	}

	setDeliveryAddress(address: AddressModel) {
		this.user.deliveryAddress = address
		this.storage.save(UserResource.USER_STORAGE_KEY, this.user)
	}

	setBillingAddress(address: AddressModel) {
		this.user.billingAddress = address
		this.storage.save(UserResource.USER_STORAGE_KEY, this.user)
	}
}
