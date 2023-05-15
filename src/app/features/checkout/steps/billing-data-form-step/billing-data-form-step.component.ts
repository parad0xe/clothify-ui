import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import UserModel from "../../../../core/models/user.model"
import { NgForm } from "@angular/forms"
import { map, Observable, of, startWith } from "rxjs"
import { SubscriptionHelper } from "../../../../core/helpers/subscription-helper.class"


@Component({
	selector: 'app-billing-data-form-step',
	templateUrl: './billing-data-form-step.component.html',
	styleUrls: ['./billing-data-form-step.component.scss']
})
export class BillingDataFormStepComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() user: UserModel
	@Output() userChange = new EventEmitter<any>()

	@Input() title: string

	@Output() valid = new EventEmitter<boolean>()

	@ViewChild('form') form: NgForm

	countries: string[] = [
		'France',
		'Allemagne',
		'Suisse'
	]
	deliveryCountryOptions: Observable<string[]>

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	ngOnInit() {
		this.deliveryCountryOptions = of(this.countries)
	}

	ngAfterViewInit() {
		if(this.form.valueChanges) {
			this._subscriptions.add = this.form.valueChanges.subscribe((data) => {
				this.valid.emit(this.form.valid ?? false)
			})
		}
	}

	onChange(e: Event) {
		const input = e.target as HTMLInputElement
		this.deliveryCountryOptions = of(input.value).pipe(
			startWith(''),
			map(country => (country ? this._filterCountry(country) : this.countries.slice()))
		)
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}

	private _filterCountry(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.countries.filter(country => country.toLowerCase().includes(filterValue));
	}
}
