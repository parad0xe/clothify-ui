import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorNotFoundComponent } from "./pages/page-error-not-found/page-error-not-found.component"

const routes: Routes = [
    { path: 'home', redirectTo: 'shop' },
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'error-404', component: PageErrorNotFoundComponent },
    { path: '**', component: PageErrorNotFoundComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
