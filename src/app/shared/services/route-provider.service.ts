import { Injectable } from '@angular/core';
import AbstractRoutesWrapper from "../../core/http/routes-wrapper.abstract"

type _Routes = { [key: string]: string }
type _RouteParams = { [key: string]: string | number }


@Injectable({
	providedIn: 'root'
})
export class RouteProviderService {
	private _routes: _Routes = {}

	constructor() { }

	add(routesWrapper: AbstractRoutesWrapper): void {
		Object.keys(routesWrapper.routes).map((routeName: string) => {
			this._routes[routeName] = routesWrapper.routes[routeName].path
		})
	}

	get(routeName: string, params: _RouteParams = {}): string {
		if (!this._routes.hasOwnProperty(routeName)) {
			return "/error-404"
		}

		let routePath = this._routes[routeName]

		Object.keys(params).map((paramName) => {
			routePath = routePath.replace(`:${paramName}`, params[paramName].toString())
		})

		return `/${routePath}`
	}
}
