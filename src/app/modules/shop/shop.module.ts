import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from "angular-star-rating"
import { PageShopProductDetailComponent } from "./pages/page-shop-product-detail/page-shop-product-detail.component"
import { PageShopProductListComponent } from "./pages/page-shop-product-list/page-shop-product-list.component"
import { RouterModule, Routes } from "@angular/router"
import { ProductService } from "./product.service"
import { FormsModule } from "@angular/forms";
import { FragmentEasyAddProductComponent } from './fragments/fragment-easy-add-product/fragment-easy-add-product.component';
import { FragmentLoaderComponent } from './fragments/fragment-loader/fragment-loader.component'

const shopRoutes: Routes = [
	{ path: 'shop', component: PageShopProductListComponent },
	{ path: 'shop/product/:id', component: PageShopProductDetailComponent }
];


@NgModule({
	declarations: [
		PageShopProductDetailComponent,
		PageShopProductListComponent,
		FragmentEasyAddProductComponent,
  FragmentLoaderComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(shopRoutes),
		StarRatingModule.forRoot()
	],
	providers: [ProductService]
})
export class ShopModule {
}
