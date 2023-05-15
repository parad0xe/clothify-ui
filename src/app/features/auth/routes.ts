import RoutesWrapperAbstract, { RoutesWrapperType } from "../../core/routes-wrapper.abstract"
import { PageLoginComponent } from "./pages/page-login/page-login.component"


export const RoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"auth:login": { path: 'login', component: PageLoginComponent }
	}
}