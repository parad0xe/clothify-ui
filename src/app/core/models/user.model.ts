import AbstractModel from "../model.abstract"
import AddressModel from "./address.model"
import { Expose, Type } from "class-transformer"


export default class UserModel extends AbstractModel<UserModel> {
	@Expose({ groups: ['post', 'patch', 'store'] })
	username: string

	@Expose({ groups: ['post', 'patch', 'store'] })
	firstname: string

	@Expose({ groups: ['post', 'patch', 'store'] })
	lastname: string

	@Expose({ groups: ['post', 'patch', 'store'] })
	email: string

	@Expose({ groups: ['post', 'patch'] })
	phone: string

	@Expose({ groups: ['post'] })
	password: string

	@Expose({ groups: ['post', 'patch'] })
	@Type(() => AddressModel)
	deliveryAddress: AddressModel = new AddressModel()

	@Expose({ groups: ['post', 'patch'] })
	@Type(() => AddressModel)
	billingAddress: AddressModel = new AddressModel()
}