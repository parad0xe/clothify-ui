import { catchError, map, Observable, of } from "rxjs"
import { HydraListInterface } from "../interfaces/hydra-list.interface"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import AbstractModel from "./model.abstract"
import { ApiService } from "../../shared/services/api.service"
import { Injectable } from "@angular/core"
import { ToastrService } from "ngx-toastr"

@Injectable()
export default abstract class AbstractResource<T extends AbstractModel> {
	protected abstract model: new () => T

	constructor(
		private api: ApiService,
		private toastr: ToastrService,
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

	private handleError<X>(error: HttpErrorResponse, errorValue: X): Observable<X> {
		console.error(error)
		this.toastr.error(error.error.message, error.status.toString(), {
			timeOut: 0,
			extendedTimeOut: 0
		})
		return of(errorValue)
	}
}