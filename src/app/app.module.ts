import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageErrorNotFoundComponent } from './pages/page-error-not-found/page-error-not-found.component'
import { ShopModule } from "./modules/shop/shop.module"
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent,
        PageErrorNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
	    HttpClientModule,
        ShopModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
