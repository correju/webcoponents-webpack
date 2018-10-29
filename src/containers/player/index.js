/* jshint ignore:start */
import {PolymerElement, html} from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class test extends PolymerElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<style>${css}</style> ${template}`
    this.play = this._play.bind(this);
      this.stop = this._stop.bind(this);
      this.checkToStop = this._checkToStop.bind(this);
      this.onLoadProgress = this._onLoadProgress.bind(this);
      shadowRoot.querySelector('.play-icon').addEventListener('click', this.play);
      shadowRoot.querySelector('.stop-icon').addEventListener('click', this.stop);
      document.addEventListener('stop-all', this.checkToStop);
      if (this.hasChildNodes()) {
        shadowRoot.querySelector('.wave-container').classList.add("short");
        shadowRoot.querySelector('slot').classList.remove("hide");
        shadowRoot.querySelector('.wave-container').classList.remove("right-border");
      }
  }
  _checkToStop (ev) {
    if (this.shadowRoot !== ev.detail) {
      this._stop();
    }
  }
  _play () {
    const progressBar = this.shadowRoot.querySelector('.progress');
    this.shadowRoot.querySelector('.play-icon').classList.add("hide");
    this.shadowRoot.querySelector('.stop-icon').classList.remove("hide");
    this.audio.play();
    this.audio.addEventListener('timeupdate', this.onLoadProgress);
    this.audio.addEventListener('ended', this.stop);
    this.createAndDispatchEvent();
  }
  createAndDispatchEvent () {
    const event = new CustomEvent('stop-all', { detail: this.shadowRoot });
    document.dispatchEvent(event);
  }
  _stop () {
    this.shadowRoot.querySelector('.play-icon').classList.remove("hide");
    this.shadowRoot.querySelector('.stop-icon').classList.add("hide");
    this.audio.pause();
    this.audio.removeEventListener('timeupdate', this.onLoadProgress);
    this.audio.removeEventListener('ended', this.stop);
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector('.play-icon').removeEventListener('click', this.play);
    this.shadowRoot.querySelector('.stop-icon').removeEventListener('click', this.stop);
    document.removeEventListener('stop-all', this.checkToStop);
  }
  _onLoadProgress () {
    const progressBar = this.shadowRoot.querySelector('.progress');
    const progress = parseInt(((this.audio.currentTime / this.audio.duration) * 100), 10);
    progressBar.style.width = progress + '%';
  }
  static get observedAttributes() {
      return ['mp3'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name){
      case 'mp3':
        if (!newVal.substring(newVal.lastIndexOf("{{")+1,newVal.lastIndexOf("}}"))) {
          this.audio = new Audio(newVal);
        }
        break;
    }
  }
}

window.customElements.define('my-player', test);