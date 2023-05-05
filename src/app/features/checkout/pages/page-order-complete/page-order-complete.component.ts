import { Component, OnDestroy, OnInit } from '@angular/core';
import OrderModel from "../../../../core/models/order.model"
import { ActivatedRoute, Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"
import { OrderService } from "../../../../shared/services/order.service"
import { SubscriptionHelper } from "../../../../core/subscription-helper.class"


@Component({
	selector: 'app-page-order-complete',
	templateUrl: './page-order-complete.component.html',
	styleUrls: ['./page-order-complete.component.scss']
})
export class PageOrderCompleteComponent implements OnInit, OnDestroy {

	order: OrderModel

	private _subscription: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		private _router: Router,
		private _routeProvider: RouteProviderService,
		private _route: ActivatedRoute,
		private _orderService: OrderService
	) {}

	ngOnInit() {
		const reference: string | null = this._route.snapshot.paramMap.get('reference')

		if(!reference) {
			this._router.navigate([this._routeProvider.get('shop:product:list')])
			return
		}

		this._subscription.add = this._orderService.get(reference).subscribe((order) => {
			if(!order) {
				this._router.navigate([this._routeProvider.get('shop:product:list')])
				return
			}

			this.order = order
		})
	}

	ngOnDestroy() {
		this._subscription.unsubscribeAll()
	}
}
