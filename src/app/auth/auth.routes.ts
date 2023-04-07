import RoutesWrapperAbstract, { RoutesWrapperType } from "../shared/abstracts/routes-wrapper.abstract"
import { PageLoginComponent } from "./pages/page-login/page-login.component"

export const AuthRoutesWrapper = new class extends RoutesWrapperAbstract {
	routes: RoutesWrapperType = {
		"auth:login": { path: 'login', component: PageLoginComponent }
	}
}