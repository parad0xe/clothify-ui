import { AfterViewInit, Component, ContentChildren, Input, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { SearchService } from "../../services/search.service"
import { ReplaySubject } from "rxjs"
import { ActivatedRoute, Router } from "@angular/router"
import { SearchRowComponent } from "../search-row/search-row.component"
import { SearchContainer } from "../../search-container.class"
import { SubscriptionHelper } from "../../../../../core/helpers/subscription-helper.class"


@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnDestroy {
	@Input() searchPageKey = 'page'
	@Input() page = 1

	private _nextPage$$: ReplaySubject<{ page: number, terms: SearchContainer }> = new ReplaySubject<{ page: number; terms: SearchContainer }>(1)
	private _firstPage$$: ReplaySubject<{ page: number, terms: SearchContainer }> = new ReplaySubject<{ page: number; terms: SearchContainer }>(1)
	private _filterChanged$$: ReplaySubject<SearchContainer> = new ReplaySubject<SearchContainer>(1)

	nextPage$ = this._nextPage$$.asObservable()
	firstPage$ = this._firstPage$$.asObservable()
	filterChanges$ = this._filterChanged$$.asObservable()

	@ContentChildren(SearchRowComponent)
	private _filterRows: QueryList<SearchRowComponent>

	private _subscriptions: SubscriptionHelper = new SubscriptionHelper()

	constructor(
		private _searchService: SearchService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _renderer: Renderer2
	) {}

	ngAfterViewInit() {
		this._addDivider()

		this._subscriptions.add = this._searchService.terms$.subscribe((terms) => {
			if (!terms.has(this.searchPageKey)) {
				this._searchService.set(this.searchPageKey, this.page)
				return
			}

			this.page = terms.getInt(this.searchPageKey, 1)

			if (terms.getInt(this.searchPageKey) !== terms.previous.getInt(this.searchPageKey) || this.page === 1) {
				if (terms.getInt(this.searchPageKey) === 1) {
					this._firstPage$$.next({ page: terms.getInt(this.searchPageKey, 1), terms: terms })
				} else {
					this._nextPage$$.next({ page: terms.getInt(this.searchPageKey, 1), terms: terms })
				}
			} else {
				this._filterChanged$$.next(terms)
			}

			this._router.navigate(
				[],
				{
					relativeTo: this._activatedRoute,
					queryParams: terms.all()
				});
		})
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribeAll()
	}

	selectPage(page: number) {
		this.page = page
		this._searchService.set(this.searchPageKey, page)
	}

	nextPage() {
		this.selectPage(this.page + 1)
	}

	firstPage() {
		this.selectPage(1)
	}

	clear() {
		this.page = 1
		this._searchService.clear()
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
