import { PageErrorNotFoundComponent } from "./pages/page-error-not-found/page-error-not-found.component"
import RoutesWrapperAbstract, { RoutesWrapperType } from "./shared/abstracts/routes-wrapper.abstract"
import { PageCartDetailComponent } from "./pages/page-cart-detail/page-cart-detail.component"

export default new class AppRoutesWrapper extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"app:home": { path: "home", redirectTo: 'shop', pathMatch: "full" },
		"app:root": { path: '', redirectTo: 'shop', pathMatch: "full" },
		"app:cart:detail": { path: 'cart-detail', component: PageCartDetailComponent },
		"app:error:404": { path: 'error-404', component: PageErrorNotFoundComponent },
		"app:_all": { path: '**', component: PageErrorNotFoundComponent }
	}
}