import RoutesWrapperAbstract, { RoutesWrapperType } from "../shared/abstracts/routes-wrapper.abstract"
import { PageCartDetailComponent } from "./pages/page-cart-detail/page-cart-detail.component"

export const CartRoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"cart:detail": { path: 'cart-detail', component: PageCartDetailComponent }
	}
}