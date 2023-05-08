import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import UserModel from "../../../../core/models/user.model"
import { AuthService } from "../../../../shared/services/auth.service"
import { UserService } from "../../../../shared/services/api/user.service"
import { CreateAccountDialogComponent } from "../../../../shared/components/dialogs/create-account-dialog/create-account-dialog.component"
import { MatDialog } from "@angular/material/dialog"
import { TokenStorageService } from "../../../../shared/services/token-storage.service"
import { LoginDialogComponent } from "../../../../shared/components/dialogs/login-dialog/login-dialog.component"


@Component({
	selector: 'app-order-summary-step',
	templateUrl: './order-summary-step.component.html',
	styleUrls: ['./order-summary-step.component.scss']
})
export class OrderSummaryStepComponent implements AfterViewInit {
	@Input() user: UserModel

	@Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>()

	constructor(
		public auth: AuthService,
		private _dialog: MatDialog,
		private _userService: UserService,
		private _tokenStorage: TokenStorageService
	) {}

	ngAfterViewInit() {
		this._tokenStorage.userToken$.subscribe((user) => {
			(user)
				? this.valid.emit(true)
				: this.valid.emit(false)
		})
	}

	updateUserInfo() {
		this._userService.updateUser(this.user)
	}

	openCreateAccountDialog(): void {
		const dialogRef = this._dialog.open(CreateAccountDialogComponent, {
			data: { user: this.user }
		})

		dialogRef.afterClosed().subscribe(result => {
			this.valid.emit(result)
		})
	}

	openLoginDialog() {
		const dialogRef = this._dialog.open(LoginDialogComponent, {
			data: { email: this.user.email }
		})

		dialogRef.afterClosed().subscribe(result => {
			this.valid.emit(result)
		})
	}
}
