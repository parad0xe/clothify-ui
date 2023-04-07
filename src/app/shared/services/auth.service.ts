import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject, tap } from "rxjs"
import UserModel from "../models/user.model"


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user: UserModel

	isLoggedIn: boolean = false
	redirectUrl?: string

	loginEvent: Subject<boolean> = new Subject<boolean>()

	constructor() { }

	login(email: string, password: string): Observable<boolean> {
		const isLoggedIn = (email === 'app@demo.com' && password === "app")

		if(isLoggedIn) {
			this.user = (new UserModel()).load({
				email: email,
				firstname: "john",
				lastname: "doe",
			})
		}

		return of(isLoggedIn).pipe(
			delay(1000),
			tap(isLoggedIn => this.isLoggedIn = isLoggedIn),
			tap(isLoggedIn => this.loginEvent.next(isLoggedIn)),
		)
	}

	logout() {
		this.isLoggedIn = false
	}
}
