import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router"
import { RoutesWrapper } from "./routes"
import { RouteProviderService } from "../../shared/services/route-provider.service"
import { PageShopProductListComponent } from "./pages/page-shop-product-list/page-shop-product-list.component"
import { PageShopProductDetailComponent } from "./pages/page-shop-product-detail/page-shop-product-detail.component"
import { AddProductComponent } from "./components/add-product/add-product.component"
import { FormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatTableModule } from "@angular/material/table"
import { LoaderModule } from "../../shared/modules/loader/loader.module"
import { SearchModule } from "../../shared/modules/search/search.module"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatBadgeModule } from "@angular/material/badge"
import { StarRatingModule } from "angular-star-rating"
import { AlertModule } from "../../shared/modules/alert/alert.module"


@NgModule({
	declarations: [
		PageShopProductDetailComponent,
		PageShopProductListComponent,
		AddProductComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(RoutesWrapper.toRoutes()),
		FormsModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatTableModule,
		LoaderModule,
		SearchModule,
		MatProgressBarModule,
		MatBadgeModule,
		StarRatingModule,
		AlertModule
	]
})
export class ShopModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(RoutesWrapper)
	}
}
