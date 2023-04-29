import { Injectable } from '@angular/core';
import ProductModel from "../../core/models/product.model"
import AbstractResource from "../../core/resource.abstract"
import ProductAttributModel from "../../core/models/productAttribut.model"


@Injectable()
export class ProductAttributResource extends AbstractResource<ProductAttributModel> {
	protected model = ProductAttributModel
}
