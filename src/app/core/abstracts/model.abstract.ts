import { plainToClassFromExist } from "class-transformer"

export default abstract class AbstractModel<T> {
	id: number

	load(data: Partial<{ [K in keyof T]: T[K]; }>): this {
		return plainToClassFromExist(this, data)
	}
}