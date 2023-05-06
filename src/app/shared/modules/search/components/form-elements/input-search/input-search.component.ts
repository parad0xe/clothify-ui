import { AfterContentInit, Component, Input } from '@angular/core';
import { SearchService } from "../../../services/search.service"


@Component({
	selector: 'input-search',
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements AfterContentInit {
	@Input() inputName: string
	@Input() label: string

	value: string = ""

	constructor(private _searchService: SearchService) {}

	ngAfterContentInit() {
		this._searchService.terms$.subscribe((terms) => {
			this.value = terms.get<string>(this.inputName, '')
		})
	}

	onChange(e: Event) {
		const target: HTMLInputElement = e.target as HTMLInputElement
		this._searchService.set(this.inputName, target.value)
	}
}
