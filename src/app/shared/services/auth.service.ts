import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from "rxjs"
import UserModel from "../../core/models/user.model"
import { HttpClient } from "@angular/common/http"
import { ApiService } from "./api/api.service"
import { TokenStorageService, UserToken } from "./token-storage.service"
import { ToastrService } from "ngx-toastr"

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
		private _tokenStorage: TokenStorageService,
		private _toastr: ToastrService
	) {}

	login(email: string, password: string): Observable<boolean> {
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

				this._tokenStorage.setToken(userToken)
				this._toastr.success(`Bienvenue ${res.firstname}`)
				return true
			}),
			catchError((error, data) => {
				return of(false)
			})
		)
	}

	logout() {
		this._tokenStorage.removeToken()
		this._toastr.success("Vous avez été déconnecté.")
	}

	get isLoggedIn(): boolean {
		return this._tokenStorage.isValid()
	}
}
