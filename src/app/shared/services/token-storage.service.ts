import { Injectable } from '@angular/core';
import StorageInterface from "../../core/interfaces/storage.interface"
import { StorageService } from "./storage.service"
import UserModel from "../../core/models/user.model"
import moment from "moment/moment"

export type UserToken = {
	token: string,
	expiresAt: string,
	user: UserModel
}


@Injectable({
	providedIn: 'root'
})
export class TokenStorageService extends StorageService {
	TOKEN_KEY = "storage:token"

	constructor() { super() }

	setToken(userToken: UserToken): void {
		this.remove(this.TOKEN_KEY);
		this.save(this.TOKEN_KEY, userToken);
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
			return
		}
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
