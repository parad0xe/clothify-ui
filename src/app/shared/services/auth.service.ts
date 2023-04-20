import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from "rxjs"
import UserModel from "../../core/models/user.model"
import { HttpClient } from "@angular/common/http"
import { ApiService } from "./api.service"
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
	constructor(
		private _http: HttpClient,
		private _api: ApiService,
		private _tokenStorage: TokenStorageService
	) {}

	login(email: string, password: string): Observable<UserModel | null> {
		return this._http.post<LoginResponse>(this._api.getLoginUrl(), {
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
						lastname: res.lastname
					})
				}

				this._tokenStorage.setToken(userToken);
				return userToken.user
			}),
			catchError((error, data) => {
				return of(null)
			})
		)
	}

	logout() {
		this._tokenStorage.removeToken()
	}

	get isLoggedIn(): boolean {
		return this._tokenStorage.isValid()
	}
}
