import { ProductAttributCategoryDto } from "./productAttributCategoryDto"


export interface ProductAttributDto {
	productAttributCategory: ProductAttributCategoryDto,
	name: string,
	value: string
}