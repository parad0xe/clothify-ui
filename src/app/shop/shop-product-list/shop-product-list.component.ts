import { Component, OnInit } from '@angular/core';
import ProductDto from "../productDto"
import { Products } from "../products.mock"


@Component({
    selector: 'app-shop-product-list',
    templateUrl: './shop-product-list.component.html',
    styles: []
})
export class ShopProductListComponent implements OnInit {
    products: ProductDto[]

    ngOnInit() {
        this.products = Products
    }
}
