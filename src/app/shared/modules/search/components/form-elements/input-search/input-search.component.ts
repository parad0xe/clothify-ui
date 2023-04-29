import { AfterContentInit, Component, Host, Input } from '@angular/core';
import { SearchService } from "../../../services/search.service"
import { SearchComponent } from "../../search/search.component"


@Component({
	selector: 'input-search',
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements AfterContentInit {
	@Input() inputName: string
	@Input() label: string

	value: string

	constructor(
		@Host() private _search: SearchComponent,
		private _searchService: SearchService
	) {
	}

	ngAfterContentInit() {
		this.value = this._search.terms.get<string>(this.inputName, '')
	}

	onChange(e: Event) {
		const target: HTMLInputElement = e.target as HTMLInputElement
		this._searchService.set(this._search.context, this.inputName, target.value)
	}
}
