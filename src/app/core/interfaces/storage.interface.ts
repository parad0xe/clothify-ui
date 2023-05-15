export default interface StorageInterface<S> {
	get<T>(storeKey: string): T | undefined
	get<T>(storeKey: string, defaultValue: T): T
	get<T>(storeKey: string, defaultValue?: T): T | undefined

	save<T>(storeKey: string, data: T): void

	getStorage(): S
}