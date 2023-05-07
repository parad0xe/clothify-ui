import { UrlHelper } from "../../../core/helpers/url-helper.class"

type SearchTermRecord = Record<string, string | string[] | null>
export type SearchTermRecordValue = string | string[] | null


export class SearchContainer {
	private _terms: SearchTermRecord = {}
	private _previousTerms: SearchTermRecord = {}

	constructor(defaultTerms = {}) {
		this._terms = defaultTerms
	}

	static load(urlParams: string): SearchContainer {
		const terms = (new UrlHelper(urlParams)).getQueryParams()
		return new SearchContainer(terms)
	}

	all(): SearchTermRecord {
		return this._terms
	}

	get previous(): SearchContainer {
		return new SearchContainer(this._previousTerms)
	}

	set(key: string, value: SearchTermRecordValue | number) {
		value = (typeof value === 'number') ? value.toString() : value

		if (value === null || value.length === 0) {
			this.remove(key)
			return
		}

		this._previousTerms = {...this._terms}
		this._terms[key] = value
	}

	remove(key: string) {
		delete this._terms[key]
	}

	has(key: string, value: string | null = null): boolean {
		if (!value) {
			return this._terms.hasOwnProperty(key)
		}

		if (this._terms.hasOwnProperty(key)) {
			return (typeof this._terms[key] === 'string')
				? this._terms[key] === value
				: (this._terms[key] as string[]).includes(value)
		}

		return false
	}

	get<T = any>(key: string): SearchTermRecordValue;
	get<T>(key: string, defaultValue: T): T;
	get<T>(key: string, defaultValue?: T): SearchTermRecordValue | T {
		if (this.has(key)) {
			return this._terms[key]
		}

		return (defaultValue) ? defaultValue : null
	}

	getInt(key: string): number | null;
	getInt(key: string, defaultValue: number): number;
	getInt(key: string, defaultValue?: number): number | null {
		if (this.has(key)) {
			if(Array.isArray(this._terms[key])) {
				throw new Error("Impossible de caster un entier provenant d'un tableau de chaîne.")
			}

			return parseInt(this._terms[key] as string)
		}

		return defaultValue ?? null
	}

	clear() {
		this._previousTerms = {...this._terms}
		this._terms = {}
	}

	buildUrlParams(): string {
		let params: string[] = []

		Object.keys(this._terms).map((termKey) => {
			if (this._terms[termKey] === null) {
				return
			}

			if (Array.isArray(this._terms[termKey])) {
				const terms: string[] = this._terms[termKey] as string[]

				terms.map((term) => {
					params.push(`${termKey}=${term}`)
				})

				return
			}

			params.push(`${termKey}=${this._terms[termKey]}`)
		})

		return params.join('&')
	}
}