import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorPageNotFoundComponent } from './error-page-not-found/error-page-not-found.component'
import { ShopModule } from "./shop/shop.module"


@NgModule({
    declarations: [
        AppComponent,
        ErrorPageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        ShopModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
