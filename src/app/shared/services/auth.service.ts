import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs"
import UserModel from "../../core/models/user.model"
import { UserService } from "./user.service"
import { HttpClient } from "@angular/common/http"
import { ApiService } from "./api.service"
import { StorageService } from "./storage.service"
import { TokenStorageService, UserToken } from "./token-storage.service"

export type LoginResponse = {
	firstname: string,
	lastname: string,
	id: number,
	token: string,
	expiresAt: string
}


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	redirectUrl?: string

	constructor(
		private http: HttpClient,
		private api: ApiService,
		private tokenStorage: TokenStorageService
	) {}

	login(email: string, password: string): Observable<UserModel | null> {
		return this.http.post<LoginResponse>(this.api.getLoginUrl(), {
			username: email,
			password: password
		}).pipe(
			map((res) => {
				const userToken: UserToken = {
					token: res.token,
					expiresAt: res.expiresAt,
					user: (new UserModel()).load({
						id: res.id,
						email: email,
						firstname: res.firstname,
						lastname: res.lastname,
					})
				}

				this.tokenStorage.setToken(userToken);
				return userToken.user
			}),
			catchError((error, data) => {
				return of(null)
			})
		)
	}

	logout() {
		this.tokenStorage.removeToken()
	}

	get isLoggedIn(): boolean {
		return this.tokenStorage.isValid()
	}

	get isLoggedOut(): boolean {
		return !this.isLoggedIn;
	}
}
