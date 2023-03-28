import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import ProductDto, { ProductAttributDto } from "../productDto"
import { Products } from "../products.mock"


@Component({
    selector: 'app-shop-product-detail',
    templateUrl: './shop-product-detail.component.html',
    styleUrls: ['./shop-product-detail.component.scss']
})
export class ShopProductDetailComponent implements OnInit {
    product: ProductDto | undefined
    sizeAttrs: ProductAttributDto[] | undefined
    colorAttrs: ProductAttributDto[] | undefined

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const id: number = +(this.route.snapshot.paramMap.get('id') ?? -1)

        this.product = Products.find(p => p.id === id)

        if(this.product) {
            this.sizeAttrs = this.product.productAttributs.filter(a => a.category.name === "Taille")
            this.colorAttrs = this.product.productAttributs.filter(a => a.category.name === "Couleur")
        } else {
            this.router.navigate(['/error-404'])
        }
    }
}
