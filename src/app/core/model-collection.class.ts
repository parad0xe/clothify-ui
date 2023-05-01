import AbstractModel from "./model.abstract"
import { HydraListInterface } from "./interfaces/hydra-list.interface"

export default class ModelCollection<T extends AbstractModel<any>> {
	private _items: T[]
	private _totalItems: number

	constructor(model: new () => T, hydraList: HydraListInterface<T> | null) {
		if(hydraList !== null) {
			this._items = hydraList['hydra:member'].map((data) => (new model).load(data))
			this._totalItems = hydraList['hydra:totalItems']
		} else {
			this._items = []
			this._totalItems = 0
		}
	}

	get items(): T[] {
		return this._items
	}

	set items(values) {
		this._items = values
		this._totalItems = values.length
	}

	get totalItems(): number {
		return this._totalItems
	}
}