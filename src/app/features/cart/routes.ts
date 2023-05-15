import RoutesWrapperAbstract, { RoutesWrapperType } from "../../core/routes-wrapper.abstract"
import { PageCartDetailComponent } from "./pages/page-cart-detail/page-cart-detail.component"


export const RoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"cart:detail": { path: 'cart-detail', component: PageCartDetailComponent },
	}
}