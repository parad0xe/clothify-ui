import { Component, Input } from '@angular/core';
import UserModel from "../../../../core/models/user.model"
import { AuthService } from "../../../../shared/services/auth.service"
import { UserService } from "../../../../shared/services/user.service"


@Component({
	selector: 'app-order-summary-step',
	templateUrl: './order-summary-step.component.html',
	styleUrls: ['./order-summary-step.component.scss']
})
export class OrderSummaryStepComponent {
	@Input() user: UserModel

	constructor(
		public auth: AuthService,
		private _userService: UserService
	) {}

	updateUserInfo() {
		this._userService.updateUser(this.user)
	}
}
