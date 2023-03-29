import { Injectable } from '@angular/core';
import ProductDto from "../../../dto/productDto"
import { Products } from "./products.mock"
import { HttpClient } from "@angular/common/http"
import { catchError, map, Observable, of, tap } from "rxjs"
import { ProductAttributDto } from "../../../dto/productAttributDto"
import { HydraList } from "../../../interfaces/HydraList"


@Injectable()
export class ProductService {

	constructor(private http: HttpClient) { }

	getProducts(): Observable<ProductDto[]> {
		return this.http.get<HydraList<ProductDto>>('http://localhost:8000/api/products').pipe(
			map((response) => response['hydra:member']),
			tap(products => console.table(products)),
			catchError((error) => this.handleError(error, []))
		)
	}

	getProductById(id: number): Observable<ProductDto | undefined> {
		return this.http.get<ProductDto>(`http://localhost:8000/api/products/${id}`).pipe(
			tap(product => console.log(product)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	getProductAttrsByCategoryName(product: ProductDto, name: string): ProductAttributDto[] {
		return product.productAttributs.filter(a => a.productAttributCategory.name === name)
	}

	getMeanRating(product: ProductDto) {
		return product.productRating.reduce((a, v) => {
			return a + v.rating
		}, 0) / product.productRating.length
	}

	private handleError<T>(error: Error, errorValue: T): Observable<T> {
		console.error(error)
		return of(errorValue)
	}
}
