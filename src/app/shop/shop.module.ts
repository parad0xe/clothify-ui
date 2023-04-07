import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from "angular-star-rating"
import { PageShopProductDetailComponent } from "./pages/page-shop-product-detail/page-shop-product-detail.component"
import { PageShopProductListComponent } from "./pages/page-shop-product-list/page-shop-product-list.component"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms";
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoaderComponent } from './components/loader/loader.component'
import { RouteProviderService } from "../shared/services/route-provider.service"
import ShopRoutesWrapper from "./shop.routes"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatTableModule } from "@angular/material/table"
import { MatBadgeModule } from "@angular/material/badge"


@NgModule({
	declarations: [
		PageShopProductDetailComponent,
		PageShopProductListComponent,
		AddProductComponent,
		LoaderComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(ShopRoutesWrapper.toRoutes()),
		StarRatingModule.forRoot(),
		MatSelectModule,
		MatButtonModule,
		MatTableModule,
		MatBadgeModule
	],
	providers: []
})
export class ShopModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(ShopRoutesWrapper)
	}
}
