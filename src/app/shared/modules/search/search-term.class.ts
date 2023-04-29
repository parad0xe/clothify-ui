type SearchTermRecord = Record<string, string | string[] | null>
export type SearchTermRecordValue = string | string[] | null


export class SearchTerms {
	private readonly _terms: SearchTermRecord = {}

	constructor(defaultTerms = {}) {
		this._terms = defaultTerms
	}

	all(): SearchTermRecord {
		return this._terms
	}

	set(key: string, value: SearchTermRecordValue) {
		if (value === null || value.length === 0) {
			this.remove(key)
			return
		}

		this._terms[key] = value
	}

	remove(key: string) {
		delete this._terms[key]
	}

	has(key: string): boolean {
		return this._terms.hasOwnProperty(key)
	}

	get(key: string): SearchTermRecordValue {
		return this._terms[key] ?? null
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