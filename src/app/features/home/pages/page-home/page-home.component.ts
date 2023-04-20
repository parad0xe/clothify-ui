import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"


@Component({
	selector: 'app-page-home',
	template: ``,
	styles: []
})
export class PageHomeComponent implements OnInit {
	constructor(private _router: Router) {}

	ngOnInit(): void {
		this._router.navigate(['/shop'])
	}

}
