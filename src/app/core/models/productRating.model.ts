import AbstractModel from "../http/model.abstract"


export default class ProductRatingModel extends AbstractModel<ProductRatingModel> {
	comment: string

	rating: number
}