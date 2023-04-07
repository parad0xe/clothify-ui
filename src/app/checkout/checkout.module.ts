import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteProviderService } from "../shared/services/route-provider.service"
import { CheckoutRoutesWrapper } from "./checkout.routes"
import { RouterModule } from "@angular/router"
import { PageCheckoutComponent } from "./pages/page-checkout/page-checkout.component"
import { MatStepperModule } from "@angular/material/stepper"
import { ReactiveFormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { NgxPayPalModule } from "ngx-paypal"
import { MatButtonModule } from "@angular/material/button"


@NgModule({
	declarations: [
		PageCheckoutComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(CheckoutRoutesWrapper.toRoutes()),
		MatStepperModule,
		ReactiveFormsModule,
		MatInputModule,
		MatAutocompleteModule,
		NgxPayPalModule,
		MatButtonModule
	]
})
export class CheckoutModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(CheckoutRoutesWrapper)
	}
}
