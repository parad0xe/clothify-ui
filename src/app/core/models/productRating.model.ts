import AbstractModel from "../model.abstract"


export default class ProductRatingModel extends AbstractModel<ProductRatingModel> {
	comment: string

	rating: number
}