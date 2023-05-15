import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { AuthService } from "../../../services/auth.service"
import { ToastrService } from "ngx-toastr"


export interface LoginDialogData {
	email: string
}


@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
	@ViewChild('password') passwordElement: ElementRef

	form: FormGroup = new FormGroup({
		email: new FormControl({ value: '', disabled: false }, [Validators.required]),
		password: new FormControl('', [Validators.required])
	})

	loading = false
	hidePassword = true

	constructor(
		public dialogRef: MatDialogRef<LoginDialogComponent, boolean>,
		@Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
		private _auth: AuthService,
		private _toastr: ToastrService
	) {}

	ngOnInit() {
		if (this.data && this.data.email) {
			this.email.setValue(this.data.email)

			setTimeout(() => {
				this.passwordElement.nativeElement.focus()
			}, 150)
		}
	}

	get email() {
		return this.form.controls['email']
	}

	get password() {
		return this.form.controls['password']
	}

	onSubmit() {
		if (!this.loading && this.form.valid) {
			this.loading = true

			this._auth.login(this.email.value, this.password.value).subscribe((isConnected) => {
				if (isConnected) {
					this.dialogRef.close(true)
				} else {
					this.loading = false
					this._toastr.error("Identifiants invalides.")
				}
			})
		}
	}
}
