import { Component } from '@angular/core';
import M from 'materialize-css';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
    title = 'Clothify';

    constructor() {
        document.addEventListener('DOMContentLoaded', function () {
            M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
            M.FormSelect.init(document.querySelectorAll('select'), {});
        });
    }
}
