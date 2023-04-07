import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteProviderService } from "../shared/services/route-provider.service"
import { RouterModule } from "@angular/router"
import { CustomComponentsModule } from "../shared/modules/custom-components/custom-components.module"
import { PageCartDetailComponent } from "./pages/page-cart-detail/page-cart-detail.component"
import { MatCardModule } from "@angular/material/card"
import { MatListModule } from "@angular/material/list"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatTableModule } from "@angular/material/table"
import { AsTypePipe } from "../shared/pipes/as-type.pipe"
import { CartRoutesWrapper } from "./cart.routes"
import { MatIconModule } from "@angular/material/icon"


@NgModule({
	declarations: [
		PageCartDetailComponent,
		AsTypePipe
	],
	imports: [
		CommonModule,
		RouterModule.forChild(CartRoutesWrapper.toRoutes()),
		CustomComponentsModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		MatInputModule,
		MatTableModule,
		MatIconModule
	]
})
export class CartModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(CartRoutesWrapper)
	}
}
