import { AfterContentInit, Component, Host, Input } from '@angular/core';
import { SearchService } from "../../../services/search.service"
import { SearchComponent } from "../../search/search.component"


@Component({
	selector: 'range-search',
	templateUrl: './range-search.component.html',
	styleUrls: ['./range-search.component.scss']
})
export class RangeSearchComponent implements AfterContentInit {
	@Input() inputName: string
	@Input() label: string

	@Input() min: number
	@Input() max: number

	@Input() charLabel: string = ""

	minValue: number = 0
	maxValue: number = 100

	constructor(
		@Host() private _search: SearchComponent,
		private _searchService: SearchService
	) {}

	ngAfterContentInit() {
		this.maxValue = this.max
	}

	onChange() {
		this.minValue = (this.minValue < this.min) ? this.min : this.minValue
		this.maxValue = (this.maxValue > this.max) ? this.max : this.maxValue
		this._searchService.set(this._search.context, `${this.inputName}[between]`, `${this.minValue}..${this.maxValue}`)
	}

	formatLabel(value: number): string {
		return `${value}${this.charLabel}`;
	}
}