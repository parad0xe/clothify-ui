import { Component, Input } from '@angular/core';
import ProductModel from "../../../../core/models/product.model"
import { MatSnackBar } from "@angular/material/snack-bar"
import { NgForm } from "@angular/forms"
import { ProductService } from "../../../../shared/services/api/product.service"
import { CartService } from "../../../../shared/services/api/cart.service"


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
		public productService: ProductService,
		private _snackBar: MatSnackBar,
		private _cartService: CartService
	) {}


	onSubmit(form: NgForm) {
		const attrColor = this.product.productAttributs.find(attr => attr.id === +this.data.attrColorId)
		const attrSize = this.product.productAttributs.find(attr => attr.id === +this.data.attrSizeId)

		if (attrColor === undefined || attrSize === undefined) {
			this._snackBar.open('Informations manquantes', 'OK', {
				horizontalPosition: "center",
				verticalPosition: "bottom",
				duration: 5000
			});

			return
		}

		this._cartService.add(this.product, [attrColor, attrSize])
		form.resetForm()
	}
}
