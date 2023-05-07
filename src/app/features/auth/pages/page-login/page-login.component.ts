import { Component, OnDestroy } from '@angular/core'
import { AuthService } from "../../../../shared/services/auth.service"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ToastrService } from "ngx-toastr"
import { StorageService } from "../../../../shared/services/storage.service"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"
import { AlertColorType } from "../../../../shared/modules/alert/alert/alert.component"
import { UrlHelper } from "../../../../core/helpers/url-helper.class"


@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnDestroy {
	info: { color: AlertColorType, message: string }

	email: string = "app@demo.com"
	password: string = "app"

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		public auth: AuthService,
		private _routeProvider: RouteProviderService,
		private _router: Router,
		private _toastr: ToastrService,
		private _storage: StorageService
	) {}

	login() {
		this._toastr.info("Connexion..")

		this._subscriptions.add = this.auth.login(this.email, this.password).subscribe((user) => {
			this._toastr.clear()
			if (user) {
				this._toastr.success(`Bienvenue ${user.firstname} ${user.lastname}`)

				const urlList = this._storage.get<string[]>('url:list')

				const redirectUrl: string = (urlList !== undefined)
					? urlList.at(-2) as string
					: this._routeProvider.get('app:home')

				const url = new UrlHelper(redirectUrl)
				this._router.navigate([url.url.pathname], { queryParams: url.getQueryParams() })
			} else {
				this._toastr.error("Connexion échoué. Des informations semble incorrect.")
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

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}
}
