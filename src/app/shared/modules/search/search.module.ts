import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { InputSearchComponent } from './components/form-elements/input-search/input-search.component';
import { MatInputModule } from "@angular/material/input"
import { FormsModule } from "@angular/forms";
import { RangeSearchComponent } from './components/form-elements/range-search/range-search.component'
import { MatSliderModule } from "@angular/material/slider";
import { BooleanSearchComponent } from './components/form-elements/boolean-search/boolean-search.component'
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectSearchComponent } from './components/form-elements/select-search/select-search.component'
import { MatSelectModule } from "@angular/material/select"
import { MatListModule } from "@angular/material/list"
import { MatExpansionModule } from "@angular/material/expansion";
import { SearchRowComponent } from './components/search-row/search-row.component'


@NgModule({
	declarations: [
		SearchComponent,
		InputSearchComponent,
		RangeSearchComponent,
		BooleanSearchComponent,
		SelectSearchComponent,
		SearchRowComponent
	],
	exports: [
		SearchComponent,
		InputSearchComponent,
		RangeSearchComponent,
		BooleanSearchComponent,
		SelectSearchComponent,
		SearchRowComponent
	],
	imports: [
		CommonModule,
		MatInputModule,
		FormsModule,
		MatSliderModule,
		MatCheckboxModule,
		MatSelectModule,
		MatListModule,
		MatExpansionModule
	]
})
export class SearchModule {
}