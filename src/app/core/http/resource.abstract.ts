import { catchError, map, Observable, of } from "rxjs"
import { HydraListInterface } from "../interfaces/hydra-list.interface"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import AbstractModel from "./model.abstract"
import { ApiService } from "../../shared/services/api.service"
import { Injectable } from "@angular/core"
import { ToastrService } from "ngx-toastr"
import { classToPlain, instanceToPlain } from "class-transformer"
import UserModel from "../models/user.model"

@Injectable()
export default abstract class AbstractResource<T extends AbstractModel<any>> {
	protected abstract model: new () => T

	constructor(
		protected api: ApiService,
		protected toastr: ToastrService,
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

	post(model: T): Observable<T | undefined> {
		const data = instanceToPlain(model, {groups: ['post'], strategy: "excludeAll"})
		return this.http.post<T>(this.api.getUrlOf(this.model), data).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	put(id: number, model: T): Observable<T | undefined> {
		const data = instanceToPlain(model, {groups: ['put'], strategy: "excludeAll"})
		return this.http.put<T>(this.api.getUrlOf(this.model, id), data).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	patch(id: number, model: T): Observable<T | undefined> {
		const data = instanceToPlain(model, {groups: ['patch'], strategy: "excludeAll"})
		return this.http.patch<T>(this.api.getUrlOf(this.model, id), data, {
			headers: {"Content-Type": 'application/merge-patch+json'}
		}).pipe(
			map((data) => (new this['model']).load(data)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	protected handleError<X>(error: HttpErrorResponse, errorValue: X): Observable<X> {
		console.error(error)

		this.toastr.error(error.error.message, error.status.toString(), {
			timeOut: 0,
			extendedTimeOut: 0
		})

		return of(errorValue)
	}
}