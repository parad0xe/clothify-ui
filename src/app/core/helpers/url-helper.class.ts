
export class UrlHelper {
	private readonly _url: URL

	constructor(urlString: string) {
		if(/^http.+/.test(urlString)) {
			this._url = new URL(urlString)
		} else {
			this._url = new URL(`${window.location.protocol}//${window.location.hostname}${urlString}`)
		}
	}

	get url(): URL {
		return this._url
	}

	getQueryParams(): object {
		return decodeURIComponent(this._url.search.substring(1)).split('&').reduce((urlParams: { [key: string]: string | string[] }, stringTerm) => {
			const [key, value] = stringTerm.split('=')

			if (value === undefined) {
				return urlParams
			}

			if (urlParams.hasOwnProperty(key)) {
				if (!Array.isArray(urlParams[key])) {
					urlParams[key] = [urlParams[key] as string]
				}

				(urlParams[key] as Array<string>).push(value)
			} else {
				urlParams[key] = value
			}

			return urlParams
		}, {})
	}
}