import { Component, Input } from '@angular/core';

export type AlertColorType = ('success' | 'error' | 'warning' | 'info')


@Component({
	selector: 'c-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
	@Input('color') color: AlertColorType
	@Input('message') message: string
}
