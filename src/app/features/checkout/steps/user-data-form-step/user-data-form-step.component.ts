import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import UserModel from "../../../../core/models/user.model"
import { NgForm } from "@angular/forms"
import { SubscriptionHelper } from "../../../../core/subscription-helper.class"


@Component({
	selector: 'app-user-data-form-step',
	templateUrl: './user-data-form-step.component.html',
	styleUrls: ['./user-data-form-step.component.scss']
})
export class UserDataFormStepComponent implements AfterViewInit, OnDestroy {
	@Input() title: string

	@Input() user: UserModel
	@Output() userChange = new EventEmitter<UserModel>();

	@Output() valid = new EventEmitter<boolean>();

	@ViewChild("form") form: NgForm

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	ngAfterViewInit() {
		if (this.form.valueChanges) {
			this._subscriptions.add = this.form.valueChanges.subscribe((data) => {
				this.valid.emit(this.form.valid ?? false)
			})
		}
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}
}
