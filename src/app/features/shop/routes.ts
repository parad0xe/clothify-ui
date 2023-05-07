import RoutesWrapperAbstract, { RoutesWrapperType } from "../../core/routes-wrapper.abstract"
import { PageShopProductListComponent } from "./pages/page-shop-product-list/page-shop-product-list.component"
import { PageShopProductDetailComponent } from "./pages/page-shop-product-detail/page-shop-product-detail.component"


export const RoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"shop:product:list": { path: "shop", component: PageShopProductListComponent, canActivate: [] },
		"shop:product:detail": { path: "shop/product/:id", component: PageShopProductDetailComponent, canActivate: [] },
	}
}