import { Injectable } from '@angular/core';
import StorageInterface from "../../core/interfaces/storage.interface"


@Injectable({
	providedIn: 'root'
})
export class StorageService implements StorageInterface<Storage> {

	constructor() { }

	get(storeKey: string): object | null {
		const item = this.getStorage().getItem(storeKey)
		return (item !== null) ? JSON.parse(item) : null
	}

	save(storeKey: string, data: object): void {
		this.getStorage().setItem(storeKey, JSON.stringify(data))
	}

	remove(storeKey: string) {
		this.getStorage().removeItem(storeKey)
	}

	getStorage(): Storage {
		return localStorage
	}
}
