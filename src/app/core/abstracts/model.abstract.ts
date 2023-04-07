import { plainToClassFromExist } from "class-transformer"

export default abstract class AbstractModel {
	id: number

	load(data: object): this {
		return plainToClassFromExist(this, data)
	}
}