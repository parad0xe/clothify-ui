import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {
	private _cache = new Map<string, HttpResponse<any>>();

	constructor() {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.method !== 'GET') {
			return next.handle(request);
		}

		const cachedResponse = this._cache.get(request.urlWithParams);

		if (cachedResponse) {
			return of(cachedResponse);
		}

		return next.handle(request).pipe(
			tap((response) => {
				if (response instanceof HttpResponse) {
					this._cache.set(request.urlWithParams, response);
				}
			})
		);
	}
}
