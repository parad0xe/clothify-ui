import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteProviderService } from "../../shared/services/route-provider.service"
import { RoutesWrapper } from "./routes"
import { RouterModule } from "@angular/router"
import { PageLoginComponent } from "./pages/page-login/page-login.component"
import { MatInputModule } from "@angular/material/input"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { AlertModule } from "../../shared/modules/alert/alert.module"
import { AuthService } from "../../shared/services/auth.service"
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { AuthInterceptor } from "../../shared/interceptors/auth.interceptor"
import { AuthGuardService } from "../../shared/guards/auth.guard"
import { LoaderModule } from "../../shared/modules/loader/loader.module"


@NgModule({
	declarations: [
		PageLoginComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(RoutesWrapper.toRoutes()),
		MatInputModule,
		FormsModule,
		MatIconModule,
		MatButtonModule,
		AlertModule,
		ReactiveFormsModule,
		LoaderModule
	],
	providers: [
		AuthService,
		AuthGuardService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	]
})
export class AuthModule {
	constructor(private routeProvider: RouteProviderService) {
		this.routeProvider.add(RoutesWrapper)
	}
}
