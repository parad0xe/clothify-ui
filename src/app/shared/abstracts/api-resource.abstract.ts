import { catchError, map, Observable, of } from "rxjs"
import { HydraListInterface } from "../interfaces/hydra-list.interface"
import { HttpClient } from "@angular/common/http"
import AbstractModel from "./model.abstract"
import { ApiService } from "../services/api.service"
import { Injectable } from "@angular/core"

@Injectable()
export default abstract class AbstractApiResource<T extends AbstractModel> {
	protected abstract model: new () => T

	constructor(
		private api: ApiService,
		protected http: HttpClient
	) {}

	all(): Observable<T[]> {
		return this.http.get<HydraListInterface<T>>(this.api.getUrlOf(this.model)).pipe(
			map((response) => response['hydra:member'].map((data) => (new this['model']).load(data))),
			catchError((error) => this.handleError(error, []))
		)
	}

	get(id: number): Observable<T | undefined> {
		return this.http.get<T>(this.api.getUrlOf(this.model, id)).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	private handleError<X>(error: Error, errorValue: X): Observable<X> {
		console.error(error)
		return of(errorValue)
	}
}