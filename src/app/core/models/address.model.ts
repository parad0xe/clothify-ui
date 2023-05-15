import AbstractModel from "../model.abstract"
import { Expose } from "class-transformer"


export default class AddressModel extends AbstractModel<AddressModel> {
	@Expose({ groups: ['get', 'patch', 'post'] })
	address: string

	@Expose({ groups: ['get', 'patch', 'post'] })
	city: string

	@Expose({ groups: ['get', 'patch', 'post'] })
	country: string

	@Expose({ groups: ['get', 'patch', 'post'] })
	postalCode: string
}