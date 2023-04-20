import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service"
import UserModel from "../../core/models/user.model"
import { BehaviorSubject } from "rxjs"
import dayjs from "dayjs"

export type UserToken = {
	token: string,
	expiresAt: string,
	user: UserModel
}


@Injectable({
	providedIn: 'root'
})
export class TokenStorageService extends StorageService {
	private _TOKEN_KEY = "storage:token"

	private _userTokenSubject = new BehaviorSubject<UserToken | null>(null)
	userToken$ = this._userTokenSubject.asObservable()

	constructor() {
		super()

		if (!this.isValid()) {
			this.removeToken()
		}

		const userToken = this.getUserToken()
		this._userTokenSubject.next(userToken)
	}

	setToken(userToken: UserToken): void {
		this.remove(this._TOKEN_KEY)
		this.save(this._TOKEN_KEY, userToken)
		this._userTokenSubject.next(userToken)
	}

	getToken(): string | null {
		const userToken: UserToken | null = this.getUserToken()

		if (userToken) {
			return userToken.token
		}

		return null
	}

	getUser(): UserModel | null {
		const userToken: UserToken | null = this.getUserToken()

		if (userToken) {
			return userToken.user
		}

		console.error("User token not exists")

		return null
	}

	setUser(user: UserModel): void {
		const userToken = this.getUserToken()

		if (userToken) {
			userToken.user = user.toLocalStorage()
			this.save(this._TOKEN_KEY, userToken)
			this._userTokenSubject.next(userToken)
			return
		}

		this._userTokenSubject.next(null)
	}

	isValid(): boolean {
		const userToken = this.get<UserToken>(this._TOKEN_KEY);

		if (userToken) {
			return dayjs(dayjs()).isSameOrBefore(userToken.expiresAt)
		}

		return false
	}

	removeToken(): void {
		this.remove(this._TOKEN_KEY)
		this._userTokenSubject.next(null)
	}

	private getUserToken(): UserToken | null {
		const userToken = this.get<UserToken>(this._TOKEN_KEY);

		if (userToken) {
			userToken.user = (new UserModel()).load(userToken.user)
			return userToken
		}

		return null
	}
}
