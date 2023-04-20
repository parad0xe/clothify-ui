import { Injectable } from '@angular/core';
import StorageInterface from "../../core/interfaces/storage.interface"


@Injectable({
	providedIn: 'root'
})
export class StorageService implements StorageInterface<Storage> {

	constructor() { }

	get<T = any>(storeKey: string): T | undefined;
	get<T>(storeKey: string, defaultValue: T): T;
	get<T>(storeKey: string, defaultValue?: T): T | undefined {
		const item = this.getStorage().getItem(storeKey)

		if(item !== null) {
			return JSON.parse(item)
		}

		return (defaultValue) ? (defaultValue as T) : undefined
	}

	save<T>(storeKey: string, data: T): void {
		this.getStorage().setItem(storeKey, JSON.stringify(data))
	}

	remove(storeKey: string) {
		this.getStorage().removeItem(storeKey)
	}

	getStorage(): Storage {
		return localStorage
	}
}
