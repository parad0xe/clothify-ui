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
import { ProductService } from "./shared/services/api-resources/product.service";
import { PageCartDetailComponent } from './pages/page-cart-detail/page-cart-detail.component';
import { MatListModule } from "@angular/material/list"
import { MatTableModule } from "@angular/material/table";
import { AsTypePipe } from './shared/pipes/as-type.pipe'
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"


@NgModule({
	declarations: [
		AppComponent,
		PageErrorNotFoundComponent,
		PageHomeComponent,
		PageCartDetailComponent,
  AsTypePipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ShopModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatListModule,
		MatTableModule,
		MatCardModule,
		MatInputModule
	],
	providers: [RouteProviderService, ApiService, ProductService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
