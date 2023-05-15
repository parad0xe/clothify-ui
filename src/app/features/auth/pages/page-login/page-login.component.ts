import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import { AuthService } from "../../../../shared/services/auth.service"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { ToastrService } from "ngx-toastr"
import { StorageService } from "../../../../shared/services/storage.service"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"
import { AlertColorType } from "../../../../shared/modules/alert/alert/alert.component"
import { UrlHelper } from "../../../../core/helpers/url-helper.class"
import { TokenStorageService } from "../../../../shared/services/token-storage.service"
import { FormControl, FormGroup, Validators } from "@angular/forms"


@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnDestroy {
	@ViewChild('password') passwordElement: ElementRef

	info: { color: AlertColorType, message: string }

	form: FormGroup = new FormGroup({
		'email': new FormControl('app@demo.com', [Validators.required]),
		'password': new FormControl('app', [Validators.required])
	})

	loading = false

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		public auth: AuthService,
		private _routeProvider: RouteProviderService,
		private _router: Router,
		private _toastr: ToastrService,
		private _storage: StorageService,
		private _tokenStorage: TokenStorageService
	) {}

	get email() {
		return this.form.controls['email']
	}

	get password() {
		return this.form.controls['password']
	}

	login() {
		if (!this.loading && this.form.valid) {
			this.loading = true

			this._subscriptions.add = this.auth.login(this.email.value, this.password.value).subscribe((isConnected) => {
				this._toastr.clear()
				const user = this._tokenStorage.getUser()

				if (!isConnected || !user) {
					this._toastr.error("Connexion échoué. Des informations semblent incorrectes.")
					this.password.patchValue("")
					this.password.markAsPending()
					this.passwordElement.nativeElement.focus()
					this.loading = false
					return
				}

				const urlList = this._storage.get<string[]>('url:list')

				const redirectUrl: string = (urlList !== undefined)
					? urlList.at(-2) as string
					: this._routeProvider.get('app:home')

				const url = new UrlHelper(redirectUrl)
				this._router.navigate([url.url.pathname], { queryParams: url.getQueryParams() })
			})
		}
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
