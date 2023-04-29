import { Component, Host, Input } from '@angular/core'
import { SearchService } from "../../../services/search.service"
import { SearchComponent } from "../../search/search.component"


@Component({
	selector: 'boolean-search',
	templateUrl: './boolean-search.component.html',
	styleUrls: ['./boolean-search.component.scss']
})
export class BooleanSearchComponent {
	@Input() inputName: string
	@Input() label: string

	checked: boolean = false

	constructor(
		@Host() private _search: SearchComponent,
		private _searchService: SearchService
	) {}

	onChange() {
		this._searchService.set(this._search.context, this.inputName, this.checked ? "1" : null)
	}
}
