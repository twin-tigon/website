import { html, css, LitElement } from 'lit';

import { HOST_STYLES, ANCHOR_STYLES, FONT_STYLES, SCROLLBAR_STYLES } from './styles.js';
import './source-editor.js';
import './source-renderer.js';

const STYLES = css`
  :host {
    background-color: var(--color-1);
    box-sizing: border-box;
    display: block;
    height: 100%;
    width: 100%;
    padding: var(--spacer-4);
  }

  main {
    display: flex;
    flex-direction: column;
    height: calc(100% - var(--spacer-6));
  }

  source-editor {
    flex-shrink: 1;
    overflow: scroll;
    scrollbar-width: thin;
  }

  html-renderer {
    flex-shrink: 1;
    overflow-y: scroll;
    scrollbar-width: thin;
  }

  footer {
    height: var(--spacer-6);
    position: relative;
  }

  a {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  @media screen and (min-width: 500px) {
    :host {
      padding: var(--spacer-5);
    }
  }

  @media screen and (min-width: 1500px) {
    :host {
      padding: var(--spacer-5);
    }

    main {
      flex-direction: row;
    }

    html-renderer {
      flex-shrink: 2;
    }
  }
`;

async function run() {
  await Promise.all(
    ['18px Bitter', '24px Bitter', '32px Bitter', '14px Space Mono'].map(async font =>
      window.document.fonts.load(font),
    ),
  );

  class WebsiteApp extends LitElement {
    static get styles() {
      return [HOST_STYLES, ANCHOR_STYLES, FONT_STYLES, SCROLLBAR_STYLES, STYLES];
    }

    static get properties() {
      return {
        _source: { type: Object, state: true },
        _hideEditor: { type: Boolean, state: true },
      };
    }

    constructor() {
      super();

      this._source = null;
      this._hideEditor = true;
    }

    /**
     *
     * @param {CustomEvent} event
     */
    onSourceChanged(event) {
      const { source } = event.detail;

      this._source = source;
    }

    /**
     *
     * @param {MouseEvent} event
     */
    toggleEditorVisibility(event) {
      event.preventDefault();

      this._hideEditor = !this._hideEditor;
    }

    render() {
      return html`
        <main>
          <source-renderer .source=${this._source}></source-renderer>
          <source-editor
            @source-changed=${/**
             *
             * @param {CustomEvent} event
             * @returns
             */
            event => this.onSourceChanged(event)}
            ?hidden=${this._hideEditor}
          ></source-editor>
        </main>
        <footer>
          <a
            href="#"
            @click=${/**
             *
             * @param {MouseEvent} event
             * @returns
             */
            event => this.toggleEditorVisibility(event)}
          >
            source
          </a>
        </footer>
      `;
    }
  }

  customElements.define('website-app', WebsiteApp);
}

run();
