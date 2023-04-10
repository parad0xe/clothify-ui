import AbstractModel from "../abstracts/model.abstract"


export default class AddressModel extends AbstractModel<AddressModel> {
	address: string
	postalCode: string
	city: string
	country: string
}