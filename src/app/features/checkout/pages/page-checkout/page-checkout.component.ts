import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from "../../../../shared/services/api/cart.service"
import { ToastrService } from "ngx-toastr"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { UserService } from "../../../../shared/services/api/user.service"
import UserModel from "../../../../core/models/user.model"
import { MatStepper } from "@angular/material/stepper"
import { StepperSelectionEvent } from "@angular/cdk/stepper"
import OrderModel from "../../../../core/models/order.model"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"


@Component({
	selector: 'app-page-checkout',
	templateUrl: './page-checkout.component.html',
	styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
	@Input() activeLabel: string

	@ViewChild('stepper') stepper: MatStepper

	user: UserModel = new UserModel()

	stepsValidity: { [key: string]: boolean } = {}

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		private _userService: UserService,
		private _toastr: ToastrService,
		private _router: Router,
		private _routerProvider: RouteProviderService,
		private _cartService: CartService
	) {}

	ngOnInit() {
		this._subscriptions.add = this._userService.user$.subscribe((user) => {
			this.user = (user) ? user : new UserModel()
		})
	}

	onStepChanged(event: StepperSelectionEvent) {
		this.activeLabel = event.selectedStep.label;
	}

	onValidateStep(label: string, isValid: boolean) {
		this.stepsValidity[label] = isValid
	}

	onOrderComplete(order: OrderModel) {
		this._cartService.clear()
		this._router.navigate([this._routerProvider.get('checkout:complete', {reference: order.reference})])
	}

	onShop() {
		this._router.navigate([this._routerProvider.get('app:home')])
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}
}
