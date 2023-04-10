import { Injectable } from '@angular/core';
import UserModel from "../../core/models/user.model"
import { BehaviorSubject, Observable, of } from "rxjs"
import { StorageService } from "./storage.service"
import { UserResource } from "../resources/user.resource"
import AddressModel from "../../core/models/address.model"

type UserData = {
	firstname: string
	lastname: string
	email: string
	phone: string
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private USER_STORAGE_KEY = "storage:user"

	private user: UserModel = new UserModel()
	private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)

	user$: Observable<UserModel | null> = this.userSubject.asObservable()

	constructor(
		private storage: StorageService
	) {
		let userData = this.storage.get(this.USER_STORAGE_KEY)

		// this.user = (userData !== null)
		// 	? (new UserModel()).load(userData)
		// 	: new UserModel()

		// of(this.user).subscribe((user) => {
		// 	this.userSubject.next(user)
		// })
	}

	loggin(user: UserModel) {
		this.user = user
		this.save()
	}

	setUserData(data: UserData) {
		this.user.firstname = data.firstname
		this.user.lastname = data.lastname
		this.user.email = data.email
		this.user.phone = data.phone
		this.save()
	}

	setDeliveryAddress(address: AddressModel) {
		this.user.deliveryAddress = address
		this.save()
	}

	setBillingAddress(address: AddressModel) {
		this.user.billingAddress = address
		this.save()
	}

	private save() {
		this.storage.save(this.USER_STORAGE_KEY, this.user)
		this.userSubject.next(this.user)
	}
}
