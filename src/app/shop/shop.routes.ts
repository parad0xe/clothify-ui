import RoutesWrapperAbstract, { RoutesWrapperType } from "../shared/abstracts/routes-wrapper.abstract"
import { PageShopProductListComponent } from "./pages/page-shop-product-list/page-shop-product-list.component"
import { PageShopProductDetailComponent } from "./pages/page-shop-product-detail/page-shop-product-detail.component"
import { AuthGuard } from "../shared/guards/auth.guard"

export default new class ShopRoutesWrapper extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"shop:product:list": { path: "shop", component: PageShopProductListComponent, canActivate: [AuthGuard] },
		"shop:product:detail": { path: "shop/product/:id", component: PageShopProductDetailComponent, canActivate: [AuthGuard] }
	}
}