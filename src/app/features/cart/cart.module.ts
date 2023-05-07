import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router"
import { RoutesWrapper } from "./routes"
import { RouteProviderService } from "../../shared/services/route-provider.service"
import { PageCartDetailComponent } from "./pages/page-cart-detail/page-cart-detail.component"
import { MatTableModule } from "@angular/material/table"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatListModule } from "@angular/material/list"
import { AlertModule } from "../../shared/modules/alert/alert.module"
import { MatInputModule } from "@angular/material/input"
import { AsTypePipe } from "../../shared/pipes/as-type.pipe"
import { MatSnackBarModule } from "@angular/material/snack-bar"


@NgModule({
	declarations: [
		PageCartDetailComponent,
		AsTypePipe
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(RoutesWrapper.toRoutes()),
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatListModule,
		AlertModule,
		MatInputModule,
		MatSnackBarModule
	]
})
export class CartModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(RoutesWrapper)
	}
}
