import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatTabsModule } from "@angular/material/tabs"
import { MatToolbarModule } from "@angular/material/toolbar"
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StarRatingModule } from "angular-star-rating"
import { ToastrModule } from "ngx-toastr"

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from "./features/auth/auth.module"
import { CartModule } from "./features/cart/cart.module"
import { CheckoutModule } from "./features/checkout/checkout.module"
import { ShopModule } from "./features/shop/shop.module"
import { PageErrorNotFoundComponent } from "./pages/errors/page-error-not-found/page-error-not-found.component"
import { PageHomeComponent } from './pages/home/pages/page-home/page-home.component'
import { CacheInterceptor } from "./shared/interceptors/cache.interceptor"
import { ProductAttributResource } from "./shared/resources/product-attribut.resource"
import { ProductResource } from "./shared/resources/product.resource"
import { UserResource } from "./shared/resources/user.resource"
import { ApiService } from "./shared/services/api/api.service"
import { CartService } from "./shared/services/api/cart.service"
import { OrderService } from "./shared/services/api/order.service"
import { ProductAttributService } from "./shared/services/api/product-attribut.service"
import { ProductService } from "./shared/services/api/product.service"
import { RouteProviderService } from "./shared/services/route-provider.service"
import { StorageService } from "./shared/services/storage.service"
import { TokenStorageService } from "./shared/services/token-storage.service"


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
		AuthModule,
		CartModule,
		CheckoutModule,
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
		StarRatingModule.forRoot(),
		MatSidenavModule,
		MatToolbarModule,
		MatButtonModule,
		MatMenuModule,
		MatTabsModule,
		MatIconModule
	],
	providers: [
		RouteProviderService,
		ApiService,
		CartService,
		ProductService,
		ProductAttributService,
		ProductResource,
		ProductAttributResource,
		OrderService,
		StorageService,
		TokenStorageService,
		UserResource,
		{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
