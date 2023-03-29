import { ProductAttributDto } from "./productAttributDto"
import { ProductRatingDto } from "./productRatingDto"
import { ProductBrandDto } from "./productBrandDto"
import { ProductCollectionDto } from "./productCollectionDto"
import { ProductCategoryDto } from "./productCategoryDto"


export default interface ProductDto {
    id: number,
    name: string,
    description: string,
    price: number,
	quantity: number,
	weight: number,
	imageUrl: string,
	isAvailable: boolean,
	isNew: boolean,
    brand: ProductBrandDto,
	collection: ProductCollectionDto,
	category: ProductCategoryDto,
	productAttributs: ProductAttributDto[]
	productRating: ProductRatingDto[],
}