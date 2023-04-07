
export default interface StorageInterface<S> {
	get(storeKey: string): object | null

	save(storeKey: string, data: object): void

	getStorage(): S
}