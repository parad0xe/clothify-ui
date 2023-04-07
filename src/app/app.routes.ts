import { PageErrorNotFoundComponent } from "./pages/page-error-not-found/page-error-not-found.component"
import RoutesWrapperAbstract, { RoutesWrapperType } from "./shared/abstracts/routes-wrapper.abstract"
import { PageCartDetailComponent } from "./cart/pages/page-cart-detail/page-cart-detail.component"
import { PageCheckoutComponent } from "./checkout/pages/page-checkout/page-checkout.component"
import { AuthGuard } from "./shared/guards/auth.guard"
import { PageLoginComponent } from "./auth/pages/page-login/page-login.component"

export const AppRoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"app:home": { path: "home", redirectTo: 'shop', pathMatch: "full" },
		"app:root": { path: '', redirectTo: 'shop', pathMatch: "full" },
		"app:error:404": { path: 'error-404', component: PageErrorNotFoundComponent },
		"app:_all": { path: '**', component: PageErrorNotFoundComponent }
	}
}