import { Component } from '@angular/core';
import { RouteProviderService } from "../../../../shared/services/route-provider.service"

@Component({
  selector: 'app-page-error-not-found',
  templateUrl: './page-error-not-found.component.html',
  styleUrls: ['./page-error-not-found.component.scss']
})
export class PageErrorNotFoundComponent {
	constructor(protected routeProvider: RouteProviderService) {}
}
