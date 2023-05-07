import { Expose, instanceToInstance, plainToClassFromExist } from "class-transformer"

export default abstract class AbstractModel<T> {
	@Expose({ groups: ['store'] })
	id: number

	load(data: Partial<{ [K in keyof T]: T[K]; }>): this {
		return plainToClassFromExist(this, data, { ignoreDecorators: true })
	}

	toLocalStorage(): this {
		return instanceToInstance(this, {
			groups: ['store'],
			strategy: "excludeAll",
			exposeUnsetFields: false,
			excludeExtraneousValues: true,
			exposeDefaultValues: false
		})
	}
}