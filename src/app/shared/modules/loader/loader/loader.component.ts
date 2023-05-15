import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
      <div class="app__loader" data-duration="200">
	      <div class="loader__message">{{message}}</div>
          <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
  `,
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
	@Input() message = ""
}
