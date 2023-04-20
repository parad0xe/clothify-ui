import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from "ngx-toastr"
import OrderModel from "../../../../core/models/order.model"


@Component({
	selector: 'app-order-success-step',
	templateUrl: './order-success-step.component.html',
	styleUrls: ['./order-success-step.component.scss']
})
export class OrderSuccessStepComponent implements OnChanges {
	@Input() activeLabel: string
	@Input() label: string
	@Input() order: OrderModel

	constructor(
		private _toastr: ToastrService
	) {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['activeLabel']) {
			if (changes['activeLabel'].currentValue === this.label) {
				this._toastr.success(`Commande ${this.order.reference} confirmé.`)
			}
		}
	}
}
