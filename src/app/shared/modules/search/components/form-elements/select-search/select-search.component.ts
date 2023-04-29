import { Component, Host, Input } from '@angular/core';
import { SearchComponent } from "../../search/search.component"
import { SearchService } from "../../../services/search.service"
import { MatSelectChange } from "@angular/material/select"
import { MatCheckboxChange } from "@angular/material/checkbox"


export type ChoiceOption = { value: string, label: string }


@Component({
	selector: 'select-search',
	templateUrl: './select-search.component.html',
	styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent {
	@Input() inputName: string
	@Input() label: string
	@Input() multiple: boolean
	@Input() choices: ChoiceOption[]
	@Input() compact: boolean = false

	selectedChoices: string[]

	constructor(
		@Host() private _search: SearchComponent,
		private _searchService: SearchService
	) {

	}

	onSelection(change: MatCheckboxChange) {
		if(change.checked) {
			this.selectedChoices = [change.source.value, ...new Set(this.selectedChoices)]
		} else {
			this.selectedChoices = this.selectedChoices.filter(choice => choice !== change.source.value)
		}

		this._searchService.set(this._search.context, this.inputName, this.selectedChoices)
	}

	onChange(change: MatSelectChange) {
		this._searchService.set(this._search.context, this.inputName, change.value)
	}
}
