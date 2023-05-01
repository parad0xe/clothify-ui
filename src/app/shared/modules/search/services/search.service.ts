import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable } from "rxjs"
import { SearchTermRecordValue, SearchTerms } from "../search-term.class"


type SearchTermsByContext = { [key: string]: SearchTerms }
type SearchTermsByContextBehaviors = { [key: string]: BehaviorSubject<SearchTerms> }


@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private _searchTermsByContext: SearchTermsByContext = {}
	private _searchByContextBehaviors: SearchTermsByContextBehaviors = {}

	constructor() { }

	new(contextKey: string, defaultSearch: SearchTerms | null = null): Observable<SearchTerms> {
		if (this.hasContext(contextKey)) {
			return this._searchByContextBehaviors[contextKey].asObservable()
		}

		if (defaultSearch === null) {
			defaultSearch = SearchTerms.load(window.location.search.substring(1))
		}

		this._searchTermsByContext[contextKey] = defaultSearch
		this._searchByContextBehaviors[contextKey] = new BehaviorSubject<SearchTerms>(defaultSearch)
		return this._searchByContextBehaviors[contextKey]
	}

	observe(contextKey: string): Observable<SearchTerms> {
		if (!this.hasContext(contextKey)) {
			this.new(contextKey)
		}

		return this._searchByContextBehaviors[contextKey].asObservable().pipe(debounceTime(500))
	}

	set(contextKey: string, dataKey: string, value: SearchTermRecordValue | number) {
		if (!this.hasContext(contextKey)) {
			throw new Error("L'observable n'existe pas.")
		}

		this._searchTermsByContext[contextKey].set(dataKey, value)
		this.next(contextKey)
	}

	remove(contextKey: string, dataKey: string) {
		if (!this.hasContext(contextKey)) {
			throw new Error("L'observable n'existe pas.")
		}

		this._searchTermsByContext[contextKey].remove(dataKey)
		this.next(contextKey)
	}

	clear(contextKey: string) {
		this._searchTermsByContext[contextKey] = new SearchTerms()
		this.next(contextKey)
	}

	hasContext(contextKey: string): boolean {
		return this._searchTermsByContext.hasOwnProperty(contextKey)
	}

	private next(contextKey: string): void {
		this._searchByContextBehaviors[contextKey].next(this._searchTermsByContext[contextKey])
	}
}
