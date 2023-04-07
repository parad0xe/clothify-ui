import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { map, Observable, startWith } from "rxjs"
import { ICreateOrderRequest, IOnApproveCallbackActions, IPayPalConfig, ITransactionItem } from "ngx-paypal"
import { CartResource } from "../../shared/services/api-resources/cart.resource"
import { MatStepper } from "@angular/material/stepper"
import { UserResource } from "../../shared/services/api-resources/user.resource"
import AddressModel from "../../shared/models/address.model"
import { CartService } from "../../shared/services/cart.service"


@Component({
	selector: 'app-page-checkout',
	templateUrl: './page-checkout.component.html',
	styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit {
	countries: string[] = [
		'France',
		'Allemagne',
		'Suisse'
	]

	userDataFormGroup = this._formBuilder.group({
		firstname: ['john', Validators.required],
		lastname: ['doe', Validators.required],
		email: ['app@demo.com', Validators.required],
		phone: ['0011223344', Validators.required]
	});

	userDeliveryFormGroup = this._formBuilder.group({
		address: ['11 rue de la pelouse', Validators.required],
		postal_code: ['15000', Validators.required],
		city: ['Lille', Validators.required],
		country: ['France', Validators.required]
	});

	userBillingFormGroup = this._formBuilder.group({
		address: ['11 rue de la pelouse', Validators.required],
		postal_code: ['15000', Validators.required],
		city: ['Lille', Validators.required],
		country: ['France', Validators.required]
	});

	deliveryCountryOptions: Observable<string[]>
	billingCountryOptions: Observable<string[]>

	paypalConfig: IPayPalConfig

	constructor(
		private _formBuilder: FormBuilder,
		private _cartService: CartService,
		private _userService: UserResource
	) {}

	ngOnInit() {
		this.initPaypalConfig()

		this.deliveryCountryOptions = this.userDeliveryFormGroup.get('country')!.valueChanges.pipe(
			startWith(''),
			map(country => (country ? this._filterCountry(country) : this.countries.slice()))
		)

		this.billingCountryOptions = this.userBillingFormGroup.get('country')!.valueChanges.pipe(
			startWith(''),
			map(country => (country ? this._filterCountry(country) : this.countries.slice()))
		)
	}

	OnSubmitUserDataForm() {
		if (!this.userDataFormGroup.valid) {
			return
		}

		this._userService.setUserData({
			firstname: this.userDataFormGroup.controls.firstname.value ?? "",
			lastname: this.userDataFormGroup.controls.lastname.value ?? "",
			email: this.userDataFormGroup.controls.email.value ?? "",
			phone: this.userDataFormGroup.controls.phone.value ?? ""
		})
	}

	OnSubmitUserDeliveryForm() {
		if (!this.userDataFormGroup.valid) {
			return
		}

		this._userService.setDeliveryAddress(
			(new AddressModel).load({
				address: this.userDeliveryFormGroup.controls.address.value ?? "",
				postalCode: this.userDeliveryFormGroup.controls.postal_code.value ?? "",
				city: this.userDeliveryFormGroup.controls.city.value ?? "",
				country: this.userDeliveryFormGroup.controls.country.value ?? ""
			})
		)
	}

	OnSubmitUserBillingForm() {
		if (!this.userDataFormGroup.valid) {
			return
		}

		this._userService.setBillingAddress(
			(new AddressModel).load({
				address: this.userDeliveryFormGroup.controls.address.value ?? "",
				postalCode: this.userDeliveryFormGroup.controls.postal_code.value ?? "",
				city: this.userDeliveryFormGroup.controls.city.value ?? "",
				country: this.userDeliveryFormGroup.controls.country.value ?? ""
			})
		)

		this.initPaypalConfig()
	}

	private async initPaypalConfig() {
		this._cartService.cart$.subscribe((payload) => {
			this.paypalConfig = {
				currency: 'EUR',
				clientId: 'AdnQjiEWKZggflLqQ6gTeRew2DlHpzFS7QNKgC4Qlxgj6YrS6NvtzVDM85h7CFbi76vIZUlX4bNi7R0_',
				createOrderOnClient: (data) => <ICreateOrderRequest>{
					intent: 'CAPTURE',
					purchase_units: [{
						description: "Commande Clothify",
						amount: {
							currency_code: 'EUR',
							value: payload.total().toString(),
							breakdown: {
								item_total: {
									currency_code: 'EUR',
									value: payload.total().toString()
								}
							}
						},
						shipping: {
							address: {
								address_line_1: this._userService.user.billingAddress.address,
								postal_code: this._userService.user.billingAddress.postalCode,
								country_code: 'FR',
								admin_area_2: this._userService.user.billingAddress.city
							},
							name: {
								full_name: this._userService.user.lastname + this._userService.user.firstname
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
				advanced: {
					commit: 'true'
				},
				style: {
					label: 'paypal',
					layout: 'vertical'
				},
				onApprove: (data, actions: IOnApproveCallbackActions) => {
					actions.order.get().then((details: object) => {
						console.log('onApprove - you can get full order details inside onApprove: ', details);
					});
				},
				onClientAuthorization: (data) => {
					console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
					// this.showSuccess = true;
				},
				onCancel: (data, actions) => {
					console.log('OnCancel', data, actions);
					// this.showCancel = true;

				},
				onError: err => {
					console.log('OnError', err);
					// this.showError = true;
				},
				onClick: (data, actions) => {
					console.log('onClick', data, actions);
					// this.resetStatus();
				}
			}
		})
	}

	private _filterCountry(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.countries.filter(country => country.toLowerCase().includes(filterValue));
	}
}