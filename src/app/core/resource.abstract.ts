import { catchError, map, Observable, of } from "rxjs"
import { HydraListInterface } from "./interfaces/hydra-list.interface"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import AbstractModel from "./model.abstract"
import { ApiService } from "../shared/services/api.service"
import { Injectable } from "@angular/core"
import { ToastrService } from "ngx-toastr"
import { instanceToPlain } from "class-transformer"
import ModelCollection from "./model-collection.class"
import { SearchContainer } from "../shared/modules/search/search-container.class"

@Injectable()
export default abstract class AbstractResource<T extends AbstractModel<any>> {
	protected abstract model: new () => T

	constructor(
		protected _api: ApiService,
		protected _toastr: ToastrService,
		protected _http: HttpClient
	) {}

	all(): Observable<ModelCollection<T>> {
		return this._http.get<HydraListInterface<T>>(this._api.getUrlOf(this.model)).pipe(
			map((response) => new ModelCollection<T>(this.model, response)),
			catchError((error) => this.handleError(error, new ModelCollection<T>(this.model, null)))
		)
	}

	findBy(terms: SearchContainer): Observable<ModelCollection<T>> {
		const params = terms.buildUrlParams()
		return this._http.get<HydraListInterface<T>>(this._api.getUrlOf(this.model) + `?${params}`).pipe(
			map((response) => new ModelCollection<T>(this.model, response)),
			catchError((error) => this.handleError(error, new ModelCollection<T>(this.model, null)))
		)
	}

	findOneBy(terms: SearchContainer): Observable<T | undefined> {
		const params = terms.buildUrlParams()
		return this._http.get<T | HydraListInterface<T>>(this._api.getUrlOf(this.model) + `?${params}`).pipe(
			map((response) => {
				if ('hydra:member' in response) {
					return (new this['model']).load(response['hydra:member'][0] ?? {})
				}

				return (new this['model']).load(response)
			}),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	get(identifier: number | string): Observable<T | undefined> {
		return this._http.get<T>(this._api.getUrlOf(this.model, identifier)).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	post(model: T): Observable<T | undefined> {
		const data = instanceToPlain(model, { groups: ['post'], strategy: "excludeAll" })
		return this._http.post<T>(this._api.getUrlOf(this.model), data).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	put(id: number, model: T): Observable<T | undefined> {
		const data = instanceToPlain(model, { groups: ['put'], strategy: "excludeAll" })
		return this._http.put<T>(this._api.getUrlOf(this.model, id), data).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	patch(id: number, model: T): Observable<T | undefined> {
		const data = instanceToPlain(model, { groups: ['patch'], strategy: "excludeAll" })
		return this._http.patch<T>(this._api.getUrlOf(this.model, id), data, {
			headers: { "Content-Type": 'application/merge-patch+json' }
		}).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	protected handleError<X>(error: HttpErrorResponse, errorValue: X): Observable<X> {
		console.error(error)

		this._toastr.error(error.error.message, error.status.toString(), {
			timeOut: 0,
			extendedTimeOut: 0
		})

		return of(errorValue)
	}
}