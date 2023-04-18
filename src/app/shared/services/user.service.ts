import { Injectable } from '@angular/core';
import UserModel from "../../core/models/user.model"
import { StorageService } from "./storage.service"
import { UserResource } from "../resources/user.resource"
import { AuthService } from "./auth.service"
import { ToastrService } from "ngx-toastr"
import { TokenStorageService } from "./token-storage.service"
import { BehaviorSubject, Observable } from "rxjs"

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
	private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)
	user$: Observable<UserModel | null> = this.userSubject.asObservable()

	constructor(
		private storage: StorageService,
		private userResource: UserResource,
		private tokenStorage: TokenStorageService,
		private auth: AuthService,
		private toastr: ToastrService
	) {
		this.tokenStorage.userToken$.subscribe((userToken) => {
			if (userToken) {
				this.userResource.get(userToken.user.id).subscribe((user) => {
					this.userSubject.next(user ?? null)
				})
			}
		})
	}

	updatePartialUser(partialUser: UserModel) {
		if (!this.auth.isLoggedIn) {
			this.toastr.error("Utilisateur non connecté")
			return
		}

		const userToken = this.tokenStorage.getUser()

		if (userToken) {
			this.userResource.patch(userToken.id, partialUser).subscribe((user) => {
				if (user) {
					this.tokenStorage.setUser(user)
					this.userSubject.next(user)
					this.toastr.success("Utilisateur mis à jour avec succès")
				}
			})
		}
	}
}
