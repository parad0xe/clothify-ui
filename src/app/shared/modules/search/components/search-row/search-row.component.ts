import { Component, ElementRef } from '@angular/core';


@Component({
	selector: 'search-row',
	templateUrl: './search-row.component.html',
	styleUrls: ['./search-row.component.scss']
})
export class SearchRowComponent {
	constructor(private el: ElementRef) {}

	get nativeElement() { return this.el.nativeElement; }
}
