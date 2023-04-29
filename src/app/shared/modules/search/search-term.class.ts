type SearchTermRecord = Record<string, string | string[] | null>
export type SearchTermRecordValue = string | string[] | null


export class SearchTerms {
	private readonly _terms: SearchTermRecord = {}

	constructor(defaultTerms = {}) {
		this._terms = defaultTerms
	}

	static load(urlParams: string): SearchTerms {
		const terms = decodeURIComponent(urlParams).split('&').reduce((a: { [key: string]: string | string[] }, stringTerm) => {
			const [key, value] = stringTerm.split('=')

			if (value === undefined) {
				return a
			}

			if (a.hasOwnProperty(key)) {
				if (!Array.isArray(a[key])) {
					a[key] = [a[key] as string]
				}

				(a[key] as Array<string>).push(value)
			} else {
				a[key] = value
			}

			return a
		}, {})

		return new SearchTerms(terms)
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