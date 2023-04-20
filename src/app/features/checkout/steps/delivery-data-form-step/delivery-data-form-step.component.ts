import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import UserModel from "../../../../core/models/user.model"
import { map, Observable, of, startWith } from "rxjs"
import { NgForm } from "@angular/forms"


@Component({
	selector: 'app-delivery-data-form-step',
	templateUrl: './delivery-data-form-step.component.html',
	styleUrls: ['./delivery-data-form-step.component.scss']
})
export class DeliveryDataFormStepComponent implements OnInit, AfterViewInit {
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

	ngOnInit() {
		this.deliveryCountryOptions = of(this.countries)
	}

	ngAfterViewInit() {
		this.form.valueChanges?.subscribe((data) => {
			this.valid.emit(this.form.valid ?? false)
		})
	}

	onChange(e: Event) {
		const input = e.target as HTMLInputElement
		this.deliveryCountryOptions = of(input.value).pipe(
			startWith(''),
			map(country => (country ? this._filterCountry(country) : this.countries.slice()))
		)
	}

	private _filterCountry(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.countries.filter(country => country.toLowerCase().includes(filterValue));
	}
}
