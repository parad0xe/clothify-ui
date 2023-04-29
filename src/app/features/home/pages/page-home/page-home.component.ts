import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { RouteProviderService } from "../../../../shared/services/route-provider.service"


@Component({
	selector: 'app-page-home',
	template: ``,
	styles: []
})
export class PageHomeComponent implements OnInit {
	constructor(
		private _router: Router,
		private _routeProvider: RouteProviderService
	) {}

	ngOnInit(): void {
		this._router.navigate([this._routeProvider.get('shop:product:list')])
	}

}
