import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import UserModel from "../../../../core/models/user.model"
import { NgForm } from "@angular/forms"


@Component({
	selector: 'app-user-data-form-step',
	templateUrl: './user-data-form-step.component.html',
	styleUrls: ['./user-data-form-step.component.scss']
})
export class UserDataFormStepComponent implements AfterViewInit {
	@Input() title: string

	@Input() user: UserModel
	@Output() userChange = new EventEmitter<UserModel>();

	@Output() valid = new EventEmitter<boolean>();

	@ViewChild("form") form: NgForm

	ngAfterViewInit() {
		this.form.valueChanges?.subscribe((data) => {
			this.valid.emit(this.form.valid ?? false)
		})
	}
}
