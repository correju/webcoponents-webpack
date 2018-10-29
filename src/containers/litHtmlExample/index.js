import { PolymerElement } from '@polymer/polymer/polymer-element';
import {html, render} from 'lit-html';
import css from './style.pcss';

export default class LiHtmlTest extends PolymerElement {
  constructor() {
    super();
    let array = ['Foo', 'Bar', 'Baz'];
    const mountPoint = document.createElement('span');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>${css}</style>`;
    shadowRoot.appendChild(mountPoint);
    const helloTemplate = (names) => html`
      <ul>
        ${names.map(e => html`<li class="list-style">lit-html ${e}!</li>`)}
      </ul>
    `;
    setTimeout(() => {
      render(helloTemplate([...array, 'Test']), mountPoint);
    }, 2000);
    render(helloTemplate(array), mountPoint);

  }
  static get observedAttributes() {
      return [];
  }
}

window.customElements.define('lit-html-test', LiHtmlTest);

