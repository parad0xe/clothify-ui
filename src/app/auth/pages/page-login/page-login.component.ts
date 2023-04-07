import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../shared/services/route-provider.service"
import { AlertColorType } from "../../../shared/modules/custom-components/components/alert/alert.component"
import { ToastrService } from "ngx-toastr"


@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
	auth: AuthService

	info: { color: AlertColorType, message: string }

	email: string = "app@demo.com"
	password: string = "app"

	constructor(
		private authService: AuthService,
		private routeProvider: RouteProviderService,
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.auth = this.authService
	}


	login() {
		this.toastr.info("Connexion..")

		this.auth.login(this.email, this.password).subscribe((isLoggedIn) => {
			if (isLoggedIn) {
				this.toastr.clear()
				this.toastr.success(`Bienvenue ${this.auth.user.firstname} ${this.auth.user.lastname}`)

				const redirectUrl = (this.auth.redirectUrl !== undefined)
					? this.auth.redirectUrl
					: this.routeProvider.get('app:home')
				this.auth.redirectUrl = undefined

				this.router.navigate([redirectUrl])
			} else {
				this.toastr.error("Connexion échoué. Des informations semble incorrect.")
				this.password = ""
			}
		})
	}

	logout() {
		this.auth.logout()

		this.info = {
			color: "success",
			message: "Déconnexion réussi"
		}
	}
}
