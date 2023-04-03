import { Component, Input } from '@angular/core';
import ProductModel from "../../../../shared/models/product.model"
import { ProductService } from "../../../../shared/services/api-resources/product.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { CartService } from "../../../../shared/services/api-resources/cart.service"
import { ApiService } from "../../../../shared/services/api.service"
import { NgForm } from "@angular/forms"


@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html'
})
export class AddProductComponent {
	@Input() product: ProductModel;
	@Input() mode: ("card" | "page");

	data = {
		attrColorId: -1,
		attrSizeId: -1
	}

	constructor(
		private snackBar: MatSnackBar,
		private cartService: CartService,
		private api: ApiService,
		protected productService: ProductService
	) {

	}


	onSubmit(form: NgForm) {
		const attrColor = this.product.productAttributs.find(attr => attr.id === +this.data.attrColorId)
		const attrSize = this.product.productAttributs.find(attr => attr.id === +this.data.attrSizeId)

		if (attrColor === undefined || attrSize === undefined) {
			this.snackBar.open('Informations manquantes', 'OK', {
				horizontalPosition: "center",
				verticalPosition: "bottom",
				duration: 5000
			});

			return
		}

		this.cartService.add(this.product, [attrColor, attrSize])
		form.resetForm()
	}
}
