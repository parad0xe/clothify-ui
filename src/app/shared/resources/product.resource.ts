import { Injectable } from '@angular/core';
import ProductModel from "../../core/models/product.model"
import AbstractResource from "../../core/resource.abstract"


@Injectable()
export class ProductResource extends AbstractResource<ProductModel> {
	protected model = ProductModel
}
