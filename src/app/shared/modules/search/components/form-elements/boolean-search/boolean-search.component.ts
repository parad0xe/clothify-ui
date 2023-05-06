import { AfterContentInit, Component, Input } from '@angular/core'
import { SearchService } from "../../../services/search.service"


@Component({
	selector: 'boolean-search',
	templateUrl: './boolean-search.component.html',
	styleUrls: ['./boolean-search.component.scss']
})
export class BooleanSearchComponent implements AfterContentInit {
	@Input() inputName: string
	@Input() label: string

	checked: boolean = false

	constructor(private _searchService: SearchService) {}

	ngAfterContentInit() {
		this._searchService.terms$.subscribe((terms) => {
			this.checked = terms.has(this.inputName)
		})
	}

	onChange() {
		this._searchService.set(this.inputName, this.checked ? "1" : null)
	}
}
