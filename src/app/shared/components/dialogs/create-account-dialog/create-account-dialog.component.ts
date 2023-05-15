import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import UserModel from "../../../../core/models/user.model"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { MatchValidator } from "../../../../core/validators/match.validator"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"
import { UserService } from "../../../services/api/user.service"
import { AuthService } from "../../../services/auth.service"


export interface CreateAccountDialogData {
	user: UserModel
}


@Component({
	selector: 'create-account-dialog',
	templateUrl: './create-account-dialog.component.html',
	styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent {
	form: FormGroup = new FormGroup({
		password: new FormControl('', [Validators.required]),
		confirmPassword: new FormControl('', [Validators.required, MatchValidator('password')])
	})

	loading = false
	hidePassword = true
	hideConfirmPassword = true

	private _subscriptions = new SubscriptionHelper()

	constructor(
		public dialogRef: MatDialogRef<CreateAccountDialogComponent, boolean>,
		@Inject(MAT_DIALOG_DATA) public data: CreateAccountDialogData,
		private _userService: UserService,
		private _auth: AuthService
	) {}

	get password() {
		return this.form.controls['password']
	}

	get confirmPassword() {
		return this.form.controls['confirmPassword']
	}

	onSubmit() {
		if (!this.loading && this.form.valid) {
			this.loading = true

			this.data.user = this.data.user.load({
				username: `${this.data.user.firstname} ${this.data.user.lastname}`,
				password: this.password.value
			})

			this._userService.createUser(this.data.user).subscribe((createdUser) => {
				if (!createdUser) {
					this.loading = false
					console.error("User not created.")
					return
				}

				this._auth.login(this.data.user.email, this.data.user.password).subscribe((isConnected) => {
					if (isConnected) {
						this.dialogRef.close(true)
					}
				})
			})
		}
	}
}
