import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from "angular-star-rating"
import { ShopProductDetailComponent } from "./shop-product-detail/shop-product-detail.component"
import { ShopProductListComponent } from "./shop-product-list/shop-product-list.component"
import { RouterModule, Routes } from "@angular/router"
import { ProductService } from "./product.service"

const shopRoutes: Routes = [
    { path: 'shop', component: ShopProductListComponent },
    { path: 'shop/product/:id', component: ShopProductDetailComponent }
];


@NgModule({
    declarations: [
        ShopProductDetailComponent,
        ShopProductListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(shopRoutes),
        StarRatingModule.forRoot()
    ],
    providers: [ProductService]
})
export class ShopModule {
}
