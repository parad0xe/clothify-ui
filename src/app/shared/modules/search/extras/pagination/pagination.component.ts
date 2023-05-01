import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator"
import { SearchService } from "../../services/search.service"


@Component({
	selector: 'search-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements AfterViewInit, OnChanges {
	@Input() context: string
	@Input() totalItems: number

	@ViewChild('paginator') paginator: MatPaginator

	pageConfig = {
		length: 0,
		pageSize: 10,
		pageIndex: 0,
		pageSizeOptions: [5, 10, 25, 50, 100]
	}

	constructor(
		private _searchService: SearchService
	) {}

	ngAfterViewInit() {
		this._searchService.observe(this.context).subscribe((terms) => {
			if (terms.getInt('page', 0) < 1) {
				this._searchService.set(this.context, 'page', this.pageConfig.pageIndex + 1)
				return
			}

			if (terms.getInt('itemsPerPage', 0) < 1) {
				this._searchService.set(this.context, 'itemsPerPage', this.pageConfig.pageSize)
				return
			}

			this.pageConfig.pageIndex = terms.getInt('page', this.pageConfig.pageIndex + 1) - 1
			this.pageConfig.pageSize = terms.getInt('itemsPerPage', this.pageConfig.pageSize)
		})
	}

	ngOnChanges() {
		this.pageConfig.length = this.totalItems

		const totalNumberOfPages = Math.ceil(this.totalItems / this.pageConfig.pageSize)

		if (this.pageConfig.pageIndex > totalNumberOfPages) {
			this._searchService.set(this.context, 'page', totalNumberOfPages)
		}
	}

	handlePageEvent(e: PageEvent) {
		this.pageConfig.length = e.length
		this.pageConfig.pageSize = e.pageSize
		this.pageConfig.pageIndex = e.pageIndex

		if (e.pageIndex + 1 > this.paginator.getNumberOfPages()) {
			this.pageConfig.pageIndex = this.paginator.getNumberOfPages() - 1
		}

		this._searchService.set(this.context, 'page', this.pageConfig.pageIndex + 1)
		this._searchService.set(this.context, 'itemsPerPage', this.pageConfig.pageSize)
	}
}
