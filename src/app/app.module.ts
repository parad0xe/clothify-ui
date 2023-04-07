import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageErrorNotFoundComponent } from './pages/page-error-not-found/page-error-not-found.component'
import { ShopModule } from "./modules/shop/shop.module"
import { HttpClientModule } from "@angular/common/http";
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { RouteProviderService } from "./shared/services/route-provider.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatTabsModule } from "@angular/material/tabs"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from "./shared/services/api.service"
import { ProductResource } from "./shared/services/api-resources/product.resource";
import { PageCartDetailComponent } from './pages/page-cart-detail/page-cart-detail.component';
import { MatListModule } from "@angular/material/list"
import { MatTableModule } from "@angular/material/table";
import { AsTypePipe } from './shared/pipes/as-type.pipe'
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input";
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component'
import { MatStepperModule } from "@angular/material/stepper"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { NgxPayPalModule } from "ngx-paypal"
import { UserResource } from "./shared/services/api-resources/user.resource"
import { AuthGuardService } from "./shared/guards/auth.guard";
import { PageLoginComponent } from './pages/page-login/page-login.component'
import { CartService } from "./shared/services/cart.service"
import { ProductService } from "./shared/services/product.service";
import { AlertComponent } from './shared/components/alert/alert.component'
import { ToastrModule } from "ngx-toastr"


@NgModule({
	declarations: [
		AppComponent,
		PageErrorNotFoundComponent,
		PageHomeComponent,
		PageCartDetailComponent,
		AsTypePipe,
		PageCheckoutComponent,
  PageLoginComponent,
  AlertComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ShopModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			closeButton: false,
			newestOnTop: true,
			positionClass: "toast-top-full-width",
			preventDuplicates: true,
			timeOut: 2000,
			extendedTimeOut: 5000,
			easeTime: 0
		}),
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatListModule,
		MatTableModule,
		MatCardModule,
		MatInputModule,
		MatStepperModule,
		MatAutocompleteModule,
		NgxPayPalModule
	],
	providers: [
		RouteProviderService,
		ApiService,
		CartService,
		ProductService,
		ProductResource,
		UserResource,
		AuthGuardService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
