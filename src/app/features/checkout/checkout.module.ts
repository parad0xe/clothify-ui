import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router"
import { RoutesWrapper } from "./routes"
import { RouteProviderService } from "../../shared/services/route-provider.service"
import { UserDataFormStepComponent } from "./steps/user-data-form-step/user-data-form-step.component"
import { DeliveryDataFormStepComponent } from "./steps/delivery-data-form-step/delivery-data-form-step.component"
import { BillingDataFormStepComponent } from "./steps/billing-data-form-step/billing-data-form-step.component"
import { OrderSummaryStepComponent } from "./steps/order-summary-step/order-summary-step.component"
import { PageOrderCompleteComponent } from "./pages/page-order-complete/page-order-complete.component"
import { PaymentStepComponent } from "./steps/payment-step/payment-step.component"
import { PageCheckoutComponent } from "./pages/page-checkout/page-checkout.component"
import { MatStepperModule } from "@angular/material/stepper"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { FormsModule } from "@angular/forms"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { MatCardModule } from "@angular/material/card"
import { NgxPayPalModule } from "ngx-paypal"
import { LoaderModule } from "../../shared/modules/loader/loader.module"
import { CartHasItemService } from "../../shared/guards/cart-has-item.guard"


@NgModule({
	declarations: [
		PageCheckoutComponent,
		UserDataFormStepComponent,
		DeliveryDataFormStepComponent,
		BillingDataFormStepComponent,
		OrderSummaryStepComponent,
		PaymentStepComponent,
		PageOrderCompleteComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(RoutesWrapper.toRoutes()),
		MatStepperModule,
		MatButtonModule,
		MatInputModule,
		FormsModule,
		MatAutocompleteModule,
		MatCardModule,
		NgxPayPalModule,
		LoaderModule
	],
	providers: [
		CartHasItemService
	]
})
export class CheckoutModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(RoutesWrapper)
	}
}
