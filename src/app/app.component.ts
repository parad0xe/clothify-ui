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
        window.addEventListener('load', () => {
            const $element: HTMLDivElement | null = document.querySelector('.app__loader')

            if($element) {
                const animation = $element.animate({opacity: 0}, {
                    duration: +($element.dataset['duration'] ?? 200),
                    fill: 'forwards'
                })

                animation.onfinish = () => {
                    const $body = document.querySelector('body')
                    if($body) {
                        $body.style.overflowY = 'auto'
                    }
                    $element.remove()
                }
            }
        })

        document.addEventListener('DOMContentLoaded', function () {
            M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
            M.FormSelect.init(document.querySelectorAll('select'), {});
        });
    }
}
