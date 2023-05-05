import { Component, Host, Input, OnInit } from '@angular/core';
import { SearchComponent } from "../../search/search.component"
import { SearchService } from "../../../services/search.service"
import { OrderProperties } from "./order.type"

@Component({
	selector: 'order-search',
	templateUrl: './order-search.component.html',
	styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {
	@Input() inputName: string
	@Input() label: string
	@Input() properties: OrderProperties
	@Input() defaultProperty: string
	@Input() defaultOrder: string

	private _lastProperty: string
	private _property: string
	order: string = "asc"

	constructor(
		@Host() private _search: SearchComponent,
		private _searchService: SearchService
	) {}

	get property() {
		return this._property
	}

	set property(value) {
		this._lastProperty = this._property
		this._property = value
	}

	ngOnInit() {
		this.property = this.properties.filter((prop) => prop.default)[0]?.value ?? ""
		this.order = this.defaultOrder ?? "asc"

		this._search.changes$.subscribe((terms) => {
			const hasOrderParameter = Object.keys(terms.all()).reduce((a, termKey) => {
				if(termKey.startsWith('order')) {
					const match = termKey.match(/order\[(.+)]/) ?? []
					const property = match[1] ?? ""

					if(this.properties.map(prop => prop.value).includes(property)) {
						this.property = property

						return a || true
					}
				}

				return a || false
			}, false)

			if(!hasOrderParameter) {
				this.property = this.properties.filter((prop) => prop.default)[0]?.value ?? ""
				this.order = this.defaultOrder ?? "asc"
			}
		})
	}

	onSelectionChange() {
		this._searchService.remove(this._search.context, `${this.inputName}[${this._lastProperty}]`)
		this._searchService.set(this._search.context, `${this.inputName}[${this.property}]`, this.order)
	}
}
