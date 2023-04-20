import { Injectable } from '@angular/core';
import UserModel from "../../core/models/user.model"
import { UserResource } from "../resources/user.resource"
import { AuthService } from "./auth.service"
import { ToastrService } from "ngx-toastr"
import { TokenStorageService } from "./token-storage.service"
import { BehaviorSubject, Observable } from "rxjs"


@Injectable({
	providedIn: 'root'
})
export class UserService {
	private _userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)
	user$: Observable<UserModel | null> = this._userSubject.asObservable()

	constructor(
		private _userResource: UserResource,
		private _tokenStorage: TokenStorageService,
		private _auth: AuthService,
		private _toastr: ToastrService
	) {
		this._tokenStorage.userToken$.subscribe((userToken) => {
			if (userToken) {
				this._userResource.get(userToken.user.id).subscribe((user) => {
					this._userSubject.next(user ?? null)
				})
			}
		})
	}

	updateUser(partialUser: UserModel) {
		if (!this._auth.isLoggedIn) {
			this._toastr.error("Utilisateur non connecté")
			return
		}

		const userToken = this._tokenStorage.getUser()

		if (userToken) {
			this._userResource.patch(userToken.id, partialUser).subscribe((user) => {
				if (user) {
					this._tokenStorage.setUser(user)
					this._userSubject.next(user)
					this._toastr.success("Utilisateur mis à jour avec succès")
				}
			})
		}
	}
}
