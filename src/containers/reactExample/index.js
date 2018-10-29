import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import React from 'react';
import { render } from 'react-dom';
import css from './style.pcss';

export default class ReactTest extends PolymerElement {
  constructor() {
    super();
    const mountPoint = document.createElement('span');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>${css}</style>`
    shadowRoot.appendChild(mountPoint);
    // const name = this.getAttribute('name');
    const array = [
        {name: 'Foo',id: 1},
        {name: 'Bar',id: 2},
        {name: 'Baz',id: 3}
    ]
    render(
        <ul>
            { array.map(e => <li className="list-style" key={e.id}>React {e.name}</li>)}
        </ul>
    , mountPoint);
  }
  static get observedAttributes() {
      return [];
  }
}

window.customElements.define('react-test', ReactTest);