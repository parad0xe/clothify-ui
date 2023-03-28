import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import ProductDto, { ProductAttributDto } from "../productDto"
import { Products } from "../products.mock"
import { ProductService } from "../product.service"


@Component({
    selector: 'app-shop-product-detail',
    templateUrl: './shop-product-detail.component.html',
    styleUrls: ['./shop-product-detail.component.scss']
})
export class ShopProductDetailComponent implements OnInit {
    product: ProductDto | undefined

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public productService: ProductService
    ) {}

    ngOnInit(): void {
        const id: number = +(this.route.snapshot.paramMap.get('id') ?? -1)

        this.product = this.productService.getProductById(id)

        if(!this.product) {
            this.router.navigate(['/error-404'])
        }
    }
}
