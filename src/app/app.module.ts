import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageErrorNotFoundComponent } from './pages/page-error-not-found/page-error-not-found.component'
import { ShopModule } from "./shop/shop.module"
import { HttpClientModule } from "@angular/common/http";
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { RouteProviderService } from "./shared/services/route-provider.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ApiService } from "./shared/services/api.service"
import { ProductResource } from "./shared/services/api-resources/product.resource";
import { UserResource } from "./shared/services/api-resources/user.resource"
import { AuthGuardService } from "./shared/guards/auth.guard";
import { CartService } from "./shared/services/cart.service"
import { ProductService } from "./shared/services/product.service";
import { ToastrModule } from "ngx-toastr"
import { AuthModule } from "./auth/auth.module"
import { CartModule } from "./cart/cart.module"
import { CheckoutModule } from "./checkout/checkout.module"
import { MatTabsModule } from "@angular/material/tabs"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatButtonModule } from "@angular/material/button"
import { MatSnackBarModule } from "@angular/material/snack-bar"


@NgModule({
	declarations: [
		AppComponent,
		PageErrorNotFoundComponent,
		PageHomeComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ShopModule,
		AuthModule,
		CartModule,
		CheckoutModule,
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
		MatTabsModule,
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatSnackBarModule
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
