import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderConfigType } from "./types/order-config.type"


@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent {
	@Input() label: string
	@Input() orderConfig: OrderConfigType<any>

	@Output() onChange: EventEmitter<never> = new EventEmitter<never>()

	onSelectionChange() {
		this.orderConfig.sort()
		this.onChange.emit()
	}
}
