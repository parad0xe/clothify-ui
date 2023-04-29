import { AfterViewInit, Component, ContentChildren, Input, QueryList, Renderer2 } from '@angular/core';
import { SearchService } from "../../services/search.service"
import { Observable, tap } from "rxjs"
import { ActivatedRoute, Router } from "@angular/router"
import { SearchTerms } from "../../search-term.class"
import { SearchRowComponent } from "../search-row/search-row.component"


@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
	@Input() context: string

	@ContentChildren(SearchRowComponent)
	private _filterRows: QueryList<SearchRowComponent>

	terms: SearchTerms

	constructor(
		private _searchService: SearchService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _renderer: Renderer2
	) {
		this.terms = _searchService.get(this.context)
	}

	ngAfterViewInit() {
		this._addDivider()
	}

	get changes(): Observable<SearchTerms> {
		return this._searchService.observe(this.context).pipe(
			tap((terms) => {
				this.terms = terms
				this._router.navigate(
					[],
					{
						relativeTo: this._activatedRoute,
						queryParams: terms.all()
					});
			})
		)
	}

	private _addDivider() {
		this._filterRows.forEach((row, index) => {
			const divider = this._renderer.createElement('mat-divider');
			divider.classList.add("my-2", "mat-divider", "mat-divider-horizontal")
			divider.ariaOrientation = "horizontal"
			divider.role = "separator"


			if (index < this._filterRows.length - 1) {
				this._renderer.insertBefore(row.nativeElement.parentNode, divider, row.nativeElement.nextSibling)
			}
		})
	}
}
