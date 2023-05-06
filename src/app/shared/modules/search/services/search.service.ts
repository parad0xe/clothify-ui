import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable } from "rxjs"
import { SearchContainer } from "../search-container.class"

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private readonly _terms: SearchContainer
	private _terms$$: BehaviorSubject<SearchContainer> = new BehaviorSubject<SearchContainer>(new SearchContainer())

	terms$: Observable<SearchContainer> = this._terms$$.asObservable().pipe(debounceTime(500))

	constructor() {
		this._terms = SearchContainer.load(window.location.search.substring(1))
		this._terms$$.next(this._terms)
	}

	set(key: string, value: any) {
		this._terms.set(key, value)
		this._terms$$.next(this._terms)
	}

	replace(previousDataKey: string, newDataKey: string, value: any) {
		this._terms.remove(previousDataKey)
		this._terms.set(newDataKey, value)
		this._terms$$.next(this._terms)
	}

	remove(dataKey: string) {
		this._terms.remove(dataKey)
		this._terms$$.next(this._terms)
	}

	clear() {
		this._terms.clear()
		this._terms$$.next(this._terms)
	}
}
