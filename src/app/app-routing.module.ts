import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import AppRoutesWrapper from "./app.routes"
import { RouteProviderService } from "./shared/services/route-provider.service"


@NgModule({
	imports: [RouterModule.forRoot(AppRoutesWrapper.toRoutes())],
	exports: [RouterModule]
})
export class AppRoutingModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(AppRoutesWrapper)
	}
}
