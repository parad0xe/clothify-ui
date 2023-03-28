import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageNotFoundComponent } from "./error-page-not-found/error-page-not-found.component"

const routes: Routes = [
    { path: 'home', redirectTo: 'shop' },
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'error-404', component: ErrorPageNotFoundComponent },
    { path: '**', component: ErrorPageNotFoundComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
