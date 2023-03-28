import { Component, OnInit } from '@angular/core';
import ProductDto from "../productDto"
import { ProductService } from "../product.service"


@Component({
    selector: 'app-shop-product-list',
    templateUrl: './shop-product-list.component.html',
    styles: []
})
export class ShopProductListComponent implements OnInit {
    products: ProductDto[]

    constructor(public productService: ProductService) {}

    ngOnInit() {
        this.products = this.productService.getProducts()
    }
}
