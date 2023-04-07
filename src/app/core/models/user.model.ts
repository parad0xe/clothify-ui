import AbstractModel from "../abstracts/model.abstract"
import AddressModel from "./address.model"
import { Type } from "class-transformer"


export default class UserModel extends AbstractModel {
	firstname: string
	lastname: string
	email: string
	phone: string

	@Type(() => AddressModel)
	deliveryAddress: AddressModel

	@Type(() => AddressModel)
	billingAddress: AddressModel
}