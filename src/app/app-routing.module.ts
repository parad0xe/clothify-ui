import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteProviderService } from "./shared/services/route-provider.service"
import { AppRoutesWrapper } from "./app.routes"


@NgModule({
	imports: [RouterModule.forRoot(AppRoutesWrapper.toRoutes())],
	exports: [RouterModule]
})
export class AppRoutingModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(AppRoutesWrapper)
	}
}
