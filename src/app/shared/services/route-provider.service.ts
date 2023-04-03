import { Injectable } from '@angular/core';
import AbstractRoutesWrapper from "../abstracts/routes-wrapper.abstract"

type _Routes = { [key: string]: string }
type _RouteParams = { [key: string]: string | number }


@Injectable({
	providedIn: 'root'
})
export class RouteProviderService {
	private routes: _Routes = {}

	constructor() { }

	add(routesWrapper: AbstractRoutesWrapper): void {
		Object.keys(routesWrapper.routes).map((routeName: string) => {
			this.routes[routeName] = routesWrapper.routes[routeName].path
		})
	}

	get(routeName: string, params: _RouteParams = {}): string {
		if (!this.routes.hasOwnProperty(routeName)) {
			return "/error-404"
		}

		let routePath = this.routes[routeName]

		Object.keys(params).map((paramName) => {
			routePath = routePath.replace(`:${paramName}`, params[paramName].toString())
		})

		return `/${routePath}`
	}
}
