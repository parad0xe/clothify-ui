import RoutesWrapperAbstract, { RoutesWrapperType } from "./core/routes-wrapper.abstract"
import { PageErrorNotFoundComponent } from "./pages/errors/page-error-not-found/page-error-not-found.component"

export const AppRoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"app:home": { path: "home", redirectTo: 'shop', pathMatch: "full" },
		"app:root": { path: '', redirectTo: 'shop', pathMatch: "full" },
		"app:error:404": { path: 'error-404', component: PageErrorNotFoundComponent },
		"app:_all": { path: '**', component: PageErrorNotFoundComponent }
	}
}