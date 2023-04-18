import AbstractModel from "../http/model.abstract"
import AddressModel from "./address.model"
import { Expose, Type } from "class-transformer"


export default class UserModel extends AbstractModel<UserModel> {
	@Expose({ groups: ['patch', 'store'] })
	firstname: string

	@Expose({ groups: ['patch', 'store'] })
	lastname: string

	@Expose({ groups: ['patch', 'store'] })
	email: string

	@Expose({ groups: ['patch'] })
	phone: string

	@Expose({ groups: ['patch'] })
	@Type(() => AddressModel)
	deliveryAddress: AddressModel

	@Expose({ groups: ['patch'] })
	@Type(() => AddressModel)
	billingAddress: AddressModel
}