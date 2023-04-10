import { Injectable } from '@angular/core';
import StorageInterface from "../../core/interfaces/storage.interface"
import { StorageService } from "./storage.service"
import UserModel from "../../core/models/user.model"
import moment from "moment/moment"
import { BehaviorSubject, Observable, Subject } from "rxjs"

export type UserToken = {
	token: string,
	expiresAt: string,
	user: UserModel
}


@Injectable({
	providedIn: 'root'
})
export class TokenStorageService extends StorageService {
	private TOKEN_KEY = "storage:token"

	private userTokenSubject = new BehaviorSubject<UserToken | null>(null)
	userToken$ = this.userTokenSubject.asObservable()

	constructor() {
		super()

		const userToken = this.getUserToken()

		this.userTokenSubject.next(userToken)
	}

	setToken(userToken: UserToken): void {
		this.remove(this.TOKEN_KEY)
		this.save(this.TOKEN_KEY, userToken)
		this.userTokenSubject.next(userToken)
	}

	getToken(): string | null {
		const userToken: UserToken | null = this.getUserToken()

		if(userToken) {
			return userToken.token
		}

		return null
	}

	getUser(): UserModel | null {
		const userToken: UserToken | null = this.getUserToken()

		if(userToken) {
			return userToken.user
		}

		console.error("User token not exists")

		return null
	}

	setUser(user: UserModel): void {
		const userToken = this.getUserToken()

		if(userToken) {
			userToken.user = user
			this.save(this.TOKEN_KEY, userToken)
			this.userTokenSubject.next(userToken)
			return
		}

		this.userTokenSubject.next(null)
	}

	isValid(): boolean {
		const userToken: UserToken = (this.get(this.TOKEN_KEY) as UserToken);

		if(userToken) {
			return moment().isBefore(moment(userToken.expiresAt));
		}

		return false
	}

	removeToken(): void {
		this.remove(this.TOKEN_KEY)
		this.userTokenSubject.next(null)
	}

	private getUserToken(): UserToken | null {
		const userToken: UserToken = (this.get(this.TOKEN_KEY) as UserToken);

		if(userToken) {
			userToken.user = (new UserModel()).load(userToken.user)
			return userToken
		}

		return null
	}
}
