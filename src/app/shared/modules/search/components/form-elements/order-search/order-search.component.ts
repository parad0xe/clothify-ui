import { Component, Input, OnInit } from '@angular/core';
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

	constructor(private _searchService: SearchService) {}

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

		this._searchService.terms$.subscribe((terms) => {
			const hasOrderParameter = Object.keys(terms.all()).reduce((a, termKey) => {
				if (/order\[(.+)]/.test(termKey)) {
					const match = termKey.match(/order\[(.+)]/) ?? []
					const property = match[1] ?? ""

					if (this.properties.map(prop => prop.value).includes(property)) {
						this.property = property
						this.order = terms.get(termKey) as ('asc' | 'desc')
						return a || true
					}
				}

				return a || false
			}, false)

			if (!hasOrderParameter) {
				this.property = this.properties.filter((prop) => prop.default)[0]?.value ?? ""
				this.order = this.defaultOrder ?? "asc"
			}
		})
	}

	onSelectionChange() {
		this._searchService.replace(
			`${this.inputName}[${this._lastProperty}]`,
			`${this.inputName}[${this.property}]`,
			this.order
		)
	}
}
