import { PageErrorNotFoundComponent } from "./pages/page-error-not-found/page-error-not-found.component"
import RoutesWrapperAbstract, { RoutesWrapperType } from "./shared/abstracts/routes-wrapper.abstract"
import { PageCartDetailComponent } from "./pages/page-cart-detail/page-cart-detail.component"
import { PageCheckoutComponent } from "./pages/page-checkout/page-checkout.component"
import { AuthGuard } from "./shared/guards/auth.guard"
import { PageLoginComponent } from "./pages/page-login/page-login.component"

export default new class AppRoutesWrapper extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"app:home": { path: "home", redirectTo: 'shop', pathMatch: "full" },
		"app:root": { path: '', redirectTo: 'shop', pathMatch: "full" },
		"app:login": { path: 'login', component: PageLoginComponent },
		"app:cart:detail": { path: 'cart-detail', component: PageCartDetailComponent, canActivate: [AuthGuard] },
		"app:checkout": { path: 'checkout', component: PageCheckoutComponent, canActivate: [AuthGuard] },
		"app:error:404": { path: 'error-404', component: PageErrorNotFoundComponent },
		"app:_all": { path: '**', component: PageErrorNotFoundComponent }
	}
}