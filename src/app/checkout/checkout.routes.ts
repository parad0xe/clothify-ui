import RoutesWrapperAbstract, { RoutesWrapperType } from "../shared/abstracts/routes-wrapper.abstract"
import { PageCheckoutComponent } from "./pages/page-checkout/page-checkout.component"

export const CheckoutRoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"checkout:index": { path: 'checkout', component: PageCheckoutComponent }
	}
}