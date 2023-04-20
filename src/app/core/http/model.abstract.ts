import { Expose, instanceToPlain, plainToClassFromExist } from "class-transformer"
import UserModel from "../models/user.model"

export default abstract class AbstractModel<T> {
	@Expose({ groups: ['store'] })
	id: number

	load(data: Partial<{ [K in keyof T]: T[K]; }>): this {
		return plainToClassFromExist(this, data, { ignoreDecorators: true })
	}

	toLocalStorage(): UserModel {
		return (new UserModel()).load(instanceToPlain(this, {
			groups: ['store'],
			strategy: "excludeAll",
			exposeUnsetFields: false,
			excludeExtraneousValues: true,
			exposeDefaultValues: false
		}))
	}
}