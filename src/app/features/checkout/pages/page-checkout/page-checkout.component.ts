import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { map, Observable, startWith } from "rxjs"
import { ICreateOrderRequest, IOnApproveCallbackActions, IPayPalConfig, ITransactionItem } from "ngx-paypal"
import AddressModel from "../../../../core/models/address.model"
import { CartService } from "../../../../shared/services/cart.service"
import { ToastrService } from "ngx-toastr"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { UserService } from "../../../../shared/services/user.service"
import UserModel from "../../../../core/models/user.model"
import { AuthService } from "../../../../shared/services/auth.service"
import { TokenStorageService } from "../../../../shared/services/token-storage.service"
import { MatStep, MatStepper } from "@angular/material/stepper"
import { OrderService } from "../../../../shared/services/order.service"


@Component({
	selector: 'app-page-checkout',
	templateUrl: './page-checkout.component.html',
	styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, AfterViewInit {
	auth: AuthService

	@ViewChild(MatStepper) stepper: MatStepper

	partialUser: UserModel = new UserModel()

	countries: string[] = [
		'France',
		'Allemagne',
		'Suisse'
	]

	userDataFormGroup = this._formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.required],
		phone: ['', Validators.required]
	});

	userDeliveryFormGroup = this._formBuilder.group({
		address: ['11 rue de la pelouse_', Validators.required],
		postal_code: ['15000', Validators.required],
		city: ['Lille', Validators.required],
		country: ['France', Validators.required]
	});

	userBillingFormGroup = this._formBuilder.group({
		address: ['11 rue de la pelouse_', Validators.required],
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
		private _userService: UserService,
		private _router: Router,
		private _routerProvider: RouteProviderService,
		private _tokenStorage: TokenStorageService,
		private _toastr: ToastrService,
		private _auth: AuthService,
		private _orderService: OrderService
	) {
		this.auth = _auth

		this._userService.user$.subscribe((user) => {
			if(user) {
				this.partialUser = user

				this.userDataFormGroup.setValue({
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					phone: user.phone
				})

				this.userBillingFormGroup.setValue({
					address: user.billingAddress.address,
					postal_code: user.billingAddress.postalCode,
					city: user.billingAddress.city,
					country: user.billingAddress.country
				})

				this.userDeliveryFormGroup.setValue({
					address: user.deliveryAddress.address,
					postal_code: user.deliveryAddress.postalCode,
					city: user.deliveryAddress.city,
					country: user.deliveryAddress.country
				})
			}
		})
	}

	ngOnInit() {
		this.deliveryCountryOptions = this.userDeliveryFormGroup.get('country')!.valueChanges.pipe(
			startWith(''),
			map(country => (country ? this._filterCountry(country) : this.countries.slice()))
		)

		this.billingCountryOptions = this.userBillingFormGroup.get('country')!.valueChanges.pipe(
			startWith(''),
			map(country => (country ? this._filterCountry(country) : this.countries.slice()))
		)
	}

	ngAfterViewInit() {
		this.stepper.selectionChange.subscribe((selection) => {
			if(selection.selectedStep.label === "checkout") {
				this.initPaypalConfig()
			}
		})
	}

	OnSubmitUserDataForm() {
		if (!this.userDataFormGroup.valid) {
			return
		}
	}
	OnSubmitUserDeliveryForm() {
		if (!this.userDataFormGroup.valid) {
			return
		}
	}
	OnSubmitUserBillingForm() {
		if (!this.userDataFormGroup.valid) {
			return
		}
	}

	updateUserInfo() {
		this.partialUser = this.partialUser.load({
			firstname: this.userDataFormGroup.controls.firstname.value ?? "",
			lastname: this.userDataFormGroup.controls.lastname.value ?? "",
			email: this.userDataFormGroup.controls.email.value ?? "",
			phone: this.userDataFormGroup.controls.phone.value ?? ""
		})

		this.partialUser = this.partialUser.load({
			deliveryAddress: (new AddressModel).load({
				address: this.userDeliveryFormGroup.controls.address.value ?? "",
				postalCode: this.userDeliveryFormGroup.controls.postal_code.value ?? "",
				city: this.userDeliveryFormGroup.controls.city.value ?? "",
				country: this.userDeliveryFormGroup.controls.country.value ?? ""
			})
		})

		this.partialUser = this.partialUser.load({
			billingAddress: (new AddressModel).load({
				address: this.userBillingFormGroup.controls.address.value ?? "",
				postalCode: this.userBillingFormGroup.controls.postal_code.value ?? "",
				city: this.userBillingFormGroup.controls.city.value ?? "",
				country: this.userBillingFormGroup.controls.country.value ?? ""
			})
		})

		this._userService.updatePartialUser(this.partialUser)
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
							value: payload.getTotalPrice().toString(),
							breakdown: {
								item_total: {
									currency_code: 'EUR',
									value:payload.getTotalPrice().toString()
								}
							}
						},
						shipping: {
							address: {
								address_line_1: this.partialUser.billingAddress.address,
								postal_code: this.partialUser.billingAddress.postalCode,
								country_code: 'FR',
								admin_area_2: this.partialUser.billingAddress.city
							},
							name: {
								full_name: this.partialUser.lastname + this.partialUser.firstname
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
				onApprove: (data, actions: IOnApproveCallbackActions) => {},
				onClientAuthorization: (data) => {
					this._orderService.createOrder(this.partialUser, payload, data.id).subscribe((order) => {
						this._toastr.success(`Commande ${data.id} confirmé.`, "", {
							timeOut: 0,
							extendedTimeOut: 0
						})
						this._cartService.clear()
						this._router.navigate([this._routerProvider.get('app:home')])
					})
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
