import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from "../services/token-storage.service"


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private tokenStorage: TokenStorageService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token: string | null = this.tokenStorage.getToken();

		if (token) {
			const cloned = request.clone({
				headers: request.headers.set("Authorization",
					"Bearer " + token)
			});

			return next.handle(cloned);
		} else {
			return next.handle(request);
		}
	}
}
