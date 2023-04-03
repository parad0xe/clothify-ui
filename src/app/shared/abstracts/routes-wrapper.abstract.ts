import { Route, Routes } from "@angular/router"

export type RoutesWrapperType = {
	[key: string]: Route & { path: string }
}

export default abstract class RoutesWrapperAbstract {
	abstract routes: RoutesWrapperType

	toRoutes(): Routes {
		return Object.values(this.routes)
	}
}