import RoutesWrapperAbstract, { RoutesWrapperType } from "../../core/routes-wrapper.abstract"
import { CartHasItemGuard } from "../../shared/guards/cart-has-item.guard"
import { PageCheckoutComponent } from "./pages/page-checkout/page-checkout.component"
import { PageOrderCompleteComponent } from "./pages/page-order-complete/page-order-complete.component"


export const RoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"checkout:index": { path: 'checkout', component: PageCheckoutComponent, canActivate: [CartHasItemGuard] },
		"checkout:complete": { path: 'checkout/:reference/complete', component: PageOrderCompleteComponent },
	}
}