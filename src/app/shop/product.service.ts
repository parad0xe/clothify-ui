import { Injectable } from '@angular/core';
import ProductDto, { ProductAttributDto } from "./productDto"
import { Products } from "./products.mock"


@Injectable()
export class ProductService {

    constructor() { }

    getProducts(): ProductDto[] {
        return Products
    }

    getProductById(id: number): ProductDto | undefined {
        return Products.find(p => p.id === id)
    }

    getProductAttrsByCategoryName(product: ProductDto, name: string): ProductAttributDto[] {
        return product.productAttributs.filter(a => a.category.name === name)
    }
}
