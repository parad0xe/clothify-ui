import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from "./pages/page-login/page-login.component"
import { RouterModule } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { FormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { CustomComponentsModule } from "../shared/modules/custom-components/custom-components.module"
import { RouteProviderService } from "../shared/services/route-provider.service"
import { AuthRoutesWrapper } from "./auth.routes"


@NgModule({
	declarations: [
		PageLoginComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(AuthRoutesWrapper.toRoutes()),
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		CustomComponentsModule
	]
})
export class AuthModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(AuthRoutesWrapper)
	}
}
