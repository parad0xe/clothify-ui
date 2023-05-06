import AbstractModel from "./model.abstract"
import { HydraListInterface } from "./interfaces/hydra-list.interface"

export default class ModelCollection<T extends AbstractModel<any>> {
	private _items: T[] = []
	private _totalItems: number = 0

	private readonly _lastPage: boolean
	private readonly _firstpage: boolean

	constructor(model: new () => T, hydraList: HydraListInterface<T> | null) {
		if(hydraList !== null) {
			this._items = hydraList['hydra:member'].map((data) => (new model).load(data))
			this._totalItems = hydraList['hydra:totalItems']

			if(hydraList.hasOwnProperty('hydra:view')) {
				this._firstpage = !hydraList['hydra:view'].hasOwnProperty("hydra:previous")
				this._lastPage = !hydraList['hydra:view'].hasOwnProperty("hydra:next")
			}
		}
	}

	get items(): T[] {
		return this._items
	}

	set items(data) {
		this._items = data
	}

	get totalItems(): number {
		return this._totalItems
	}

	get isLastPage(): boolean {
		return this._lastPage
	}

	get isFirstPage(): boolean {
		return this._firstpage
	}

	clear() {
		this._items = []
	}

	push(collection: ModelCollection<T>) {
		this._items.push(...collection.items)

		if(this._totalItems === 0) {
			this._totalItems = collection.totalItems
		}
	}
}