import { PageErrorNotFoundComponent } from "./features/errors/pages/page-error-not-found/page-error-not-found.component"
import RoutesWrapperAbstract, { RoutesWrapperType } from "./core/routes-wrapper.abstract"
import { PageLoginComponent } from "./features/auth/pages/page-login/page-login.component"
import { PageCartDetailComponent } from "./features/cart/pages/page-cart-detail/page-cart-detail.component"
import { PageCheckoutComponent } from "./features/checkout/pages/page-checkout/page-checkout.component"
import { PageShopProductListComponent } from "./features/shop/pages/page-shop-product-list/page-shop-product-list.component"
import { PageShopProductDetailComponent } from "./features/shop/pages/page-shop-product-detail/page-shop-product-detail.component"

export const AppRoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"app:home": { path: "home", redirectTo: 'shop', pathMatch: "full" },
		"app:root": { path: '', redirectTo: 'shop', pathMatch: "full" },
		"auth:login": { path: 'login', component: PageLoginComponent },
		"cart:detail": { path: 'cart-detail', component: PageCartDetailComponent },
		"checkout:index": { path: 'checkout', component: PageCheckoutComponent },
		"shop:product:list": { path: "shop", component: PageShopProductListComponent, canActivate: [] },
		"shop:product:detail": { path: "shop/product/:id", component: PageShopProductDetailComponent, canActivate: [] },
		"app:error:404": { path: 'error-404', component: PageErrorNotFoundComponent },
		"app:_all": { path: '**', component: PageErrorNotFoundComponent }
	}
}