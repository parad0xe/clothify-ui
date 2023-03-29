import { Component, Input } from '@angular/core';
import ProductDto from "../../../../../dto/productDto"
import { ProductService } from "../../product.service"


@Component({
	selector: 'app-fragment-easy-add-product',
	templateUrl: './fragment-easy-add-product.component.html'
})
export class FragmentEasyAddProductComponent {
	@Input() product: ProductDto;

	constructor(protected productService: ProductService) {}

	ngOnInit(): void {}

	onSubmit() {
		console.log()
	}
}
