import AbstractModel from "../../../../core/model.abstract"

export type OrderSortCallback = () => void

export enum Order {
	ASC = "asc",
	DESC = "desc"
}

export type OrderConfigType<T extends AbstractModel<U>, U = any> = {
	on: { property: Partial<keyof U>, label: string }[],
	selectedProperty: Partial<keyof U>,
	selectedOrder: (Order.ASC | Order.DESC),
	sort: OrderSortCallback
}