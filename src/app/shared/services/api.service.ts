import { Injectable } from '@angular/core';
import AbstractModel from "../../core/abstracts/model.abstract"


@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private readonly base = {
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

		const iri = `${this.base.entrypoint}/${entity}s`
		return (id === undefined) ? iri : `${iri}/${id}`
	}

	getUrlOf(model: (typeof AbstractModel), id?: number): string {
		return `${this.base.url}${this.getIriOf(model, id)}`
	}

	getBaseUrl(): string {
		return this.base.url
	}

	getEntrypoint(): string {
		return this.base.entrypoint
	}

	getLoginUrl(): string {
		return this.base.login
	}
}
