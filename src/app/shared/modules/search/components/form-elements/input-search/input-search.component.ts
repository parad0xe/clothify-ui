import { Component, Host, Input } from '@angular/core';
import { SearchService } from "../../../services/search.service"
import { SearchComponent } from "../../search/search.component"


@Component({
	selector: 'input-search',
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
	@Input() inputName: string
	@Input() label: string

	constructor(
		@Host() private _search: SearchComponent,
		private _searchService: SearchService
	) {}

	onChange(e: Event) {
		const target: HTMLInputElement = e.target as HTMLInputElement
		this._searchService.set(this._search.context, this.inputName, target.value)
	}
}
