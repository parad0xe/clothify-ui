import { Injectable } from '@angular/core';
import AbstractModel from "../../core/http/model.abstract"


@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private readonly _base = {
		url: "https://localhost:8000",
		login: "https://localhost:8000/api/login",
		entrypoint: "/api"
	}

	constructor() { }

	getIriOf(model: (typeof AbstractModel), id?: number): string {
		const entity = model.name
			.split('Model')[0]
			.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
			.toLowerCase()
			.slice(1)

		const iri = `${this._base.entrypoint}/${entity}s`
		return (id === undefined) ? iri : `${iri}/${id}`
	}

	getUrlOf(model: (typeof AbstractModel), id?: number): string {
		return `${this._base.url}${this.getIriOf(model, id)}`
	}

	getBaseUrl(): string {
		return this._base.url
	}

	getEntrypoint(): string {
		return this._base.entrypoint
	}

	getLoginUrl(): string {
		return this._base.login
	}
}
