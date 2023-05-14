import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem } from "ngx-paypal"
import { CartService } from "../../../../shared/services/cart.service"
import UserModel from "../../../../core/models/user.model"
import { OrderService } from "../../../../shared/services/api/order.service"
import { ToastrService } from "ngx-toastr"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"
import { lastValueFrom, tap } from "rxjs"


type AuthorizationOrderResponse = { isAuthorized: boolean, message: string, reference: string | null }


@Component({
	selector: 'app-payment-step',
	templateUrl: './payment-step.component.html',
	styleUrls: ['./payment-step.component.scss']
})
export class PaymentStepComponent implements OnChanges, OnDestroy {
	@Input() activeLabel: string
	@Input() label: string
	@Input() user: UserModel

	@Output() orderComplete = new EventEmitter<string>()

	loading = false
	paypalConfig: IPayPalConfig

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		private _cartService: CartService,
		private _orderService: OrderService,
		private _toastr: ToastrService,
		private _router: Router,
		private _routerProvider: RouteProviderService
	) {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['activeLabel']) {
			if (changes['activeLabel'].currentValue === this.label) {
				this.initPaypalConfig()
			}
		}
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}

	private async initPaypalConfig() {
		this.loading = true
		this._subscriptions.add = this._cartService.cart$.subscribe((payload) => {
			this.paypalConfig = {
				currency: 'EUR',
				clientId: 'AdnQjiEWKZggflLqQ6gTeRew2DlHpzFS7QNKgC4Qlxgj6YrS6NvtzVDM85h7CFbi76vIZUlX4bNi7R0_',
				createOrderOnClient: (data) => <ICreateOrderRequest>{
					intent: 'AUTHORIZE',
					purchase_units: [{
						description: "Commande Clothify",
						amount: {
							currency_code: 'EUR',
							value: payload.getTotalPrice().toString(),
							breakdown: {
								item_total: {
									currency_code: 'EUR',
									value: payload.getTotalPrice().toString()
								}
							}
						},
						shipping: {
							address: {
								address_line_1: this.user.billingAddress.address,
								postal_code: this.user.billingAddress.postalCode,
								country_code: 'FR',
								admin_area_2: this.user.billingAddress.city
							},
							name: {
								full_name: this.user.lastname + this.user.firstname
							}
						},
						items: payload.cart.items.map((item): ITransactionItem => {
							return {
								name: item.product.name,
								quantity: item.quantity.toString(),
								category: 'PHYSICAL_GOODS',
								unit_amount: {
									currency_code: 'EUR',
									value: item.product.price.toString()
								}
							}
						})
					}]
				},
				authorizeOnServer: (data) => {
					return lastValueFrom(this._orderService.authorizeOrder<AuthorizationOrderResponse>(data.orderID, payload).pipe(
						tap((response) => {
							if(response) {
								if (response.isAuthorized && response.reference) {
									this._toastr.success(response.message)
									this.orderComplete.emit(response.reference)
								} else {
									this._toastr.error(response.message)
								}

								return
							}

							this._toastr.error("Une erreur c'est produite.")
						})
					))
				},
				advanced: {
					commit: 'true',
					extraQueryParams: [{
						name: 'intent',
						value: 'authorize'
					}]
				},
				style: {
					label: 'paypal',
					layout: 'vertical'
				},
				onCancel: (data, actions) => {},
				onError: err => {},
				onClick: (data, actions) => {}
			}
			this.loading = false
		})
	}
}
