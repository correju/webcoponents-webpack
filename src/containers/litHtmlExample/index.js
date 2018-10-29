import { PolymerElement } from '@polymer/polymer/polymer-element';
import {html, render} from 'lit-html';
import css from './style.pcss';

export default class LiHtmlTest extends PolymerElement {
  constructor() {
    super();
    this.array = ['Foo', 'Bar', 'Baz'];
    this.mountPoint = document.createElement('span');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>${css}</style>`;
    shadowRoot.appendChild(this.mountPoint);
    this.helloTemplate = (names) => html`
      <ul>
        ${names.map(e => html`<li class="list-style">lit-html ${e}!</li>`)}
      </ul>
      <div class="btn-container">
        <button class="btn button-style" @click="${(event) => this._click()}">HAGA CLICK</button>
      </div>
    `;
    // setTimeout(() => {
    //   render(this.helloTemplate([...array, 'Test']), this.mountPoint);
    // }, 2000);
    render(this.helloTemplate(this.array), this.mountPoint);

  }
  _click () {
    this.array = [...this.array, 'Test'];
    render(this.helloTemplate(this.array), this.mountPoint);
  }
  static get observedAttributes() {
      return [];
  }
}

window.customElements.define('lit-html-test', LiHtmlTest);

