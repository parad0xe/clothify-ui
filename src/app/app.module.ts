import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageErrorNotFoundComponent } from './features/errors/pages/page-error-not-found/page-error-not-found.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { PageHomeComponent } from './features/home/pages/page-home/page-home.component';
import { RouteProviderService } from "./shared/services/route-provider.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ApiService } from "./shared/services/api.service"
import { ProductResource } from "./shared/resources/product.resource";
import { UserResource } from "./shared/resources/user.resource"
import { AuthGuardService } from "./shared/guards/auth.guard";
import { CartService } from "./shared/services/cart.service"
import { ProductService } from "./shared/services/product.service";
import { ToastrModule } from "ngx-toastr"
import { MatTabsModule } from "@angular/material/tabs"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatButtonModule } from "@angular/material/button"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { PageLoginComponent } from "./features/auth/pages/page-login/page-login.component"
import { PageCartDetailComponent } from "./features/cart/pages/page-cart-detail/page-cart-detail.component"
import { PageCheckoutComponent } from "./features/checkout/pages/page-checkout/page-checkout.component"
import { PageShopProductListComponent } from "./features/shop/pages/page-shop-product-list/page-shop-product-list.component"
import { PageShopProductDetailComponent } from "./features/shop/pages/page-shop-product-detail/page-shop-product-detail.component"
import { AddProductComponent } from "./features/shop/components/add-product/add-product.component"
import { LoaderComponent } from "./features/shop/components/loader/loader.component"
import { MatInputModule } from "@angular/material/input"
import { MatTableModule } from "@angular/material/table"
import { AsTypePipe } from "./shared/pipes/as-type.pipe"
import { MatCardModule } from "@angular/material/card"
import { MatListModule } from "@angular/material/list"
import { MatStepperModule } from "@angular/material/stepper"
import { NgxPayPalModule } from "ngx-paypal"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { MatBadgeModule } from "@angular/material/badge"
import { MatSelectModule } from "@angular/material/select"
import { StarRatingModule } from "angular-star-rating"
import { AlertComponent } from "./shared/components/alert/alert.component"
import { StorageService } from "./shared/services/storage.service"
import { TokenStorageService } from "./shared/services/token-storage.service"
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor"
import { MatMenuModule } from "@angular/material/menu"


@NgModule({
	declarations: [
		AppComponent,
		PageErrorNotFoundComponent,
		PageHomeComponent,
		PageLoginComponent,
		PageCartDetailComponent,
		PageCheckoutComponent,
		PageShopProductListComponent,
		PageShopProductDetailComponent,
		AddProductComponent,
		LoaderComponent,
		AlertComponent,
		AsTypePipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
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
		MatSnackBarModule,
		MatInputModule,
		MatTableModule,
		MatCardModule,
		MatListModule,
		MatStepperModule,
		NgxPayPalModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatSelectModule,
		StarRatingModule.forRoot(),
		MatMenuModule
	],
	providers: [
		RouteProviderService,
		ApiService,
		CartService,
		ProductService,
		ProductResource,
		StorageService,
		TokenStorageService,
		UserResource,
		AuthGuardService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
