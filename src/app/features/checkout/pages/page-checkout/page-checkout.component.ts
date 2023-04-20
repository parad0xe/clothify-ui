import { Component, Input, ViewChild } from '@angular/core';
import { CartService } from "../../../../shared/services/cart.service"
import { ToastrService } from "ngx-toastr"
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { UserService } from "../../../../shared/services/user.service"
import UserModel from "../../../../core/models/user.model"
import { MatStepper } from "@angular/material/stepper"
import { StepperSelectionEvent } from "@angular/cdk/stepper"
import OrderModel from "../../../../core/models/order.model"


@Component({
	selector: 'app-page-checkout',
	templateUrl: './page-checkout.component.html',
	styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent {
	@Input() activeLabel: string

	@ViewChild('stepper') stepper: MatStepper

	user: UserModel = new UserModel()

	order: OrderModel

	stepsValidity: { [key: string]: boolean } = {}

	constructor(
		private _userService: UserService,
		private _toastr: ToastrService,
		private _router: Router,
		private _routerProvider: RouteProviderService,
		private _cartService: CartService
	) {
		this._userService.user$.subscribe((user) => {
			if (user) {
				this.user = user
			}
		})
	}

	onStepChanged(event: StepperSelectionEvent) {
		this.activeLabel = event.selectedStep.label;
	}

	onValidateStep(label: string, isValid: boolean) {
		this.stepsValidity[label] = isValid
	}

	onOrderComplete(order: OrderModel) {
		this.order = order
		this._cartService.clear()
		this.stepper.next()
	}

	onShop() {
		this._router.navigate([this._routerProvider.get('app:home')])
	}
}
