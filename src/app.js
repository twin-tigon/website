import { html, css, LitElement } from 'lit';

import {
  ANCHOR_STYLES,
  FONT_STYLES,
  SCROLLBAR_STYLES,
  FONT_SIZE,
  FONT_FAMILY,
  COLOR,
  SPACER,
  WIDTH,
} from './styles.js';
import './source-editor.js';
import './source-renderer.js';

const STYLES = css`
  :host {
    background-color: ${COLOR[0]};
    box-sizing: border-box;
    display: block;
    height: 100%;
    width: 100%;
    padding: ${SPACER[5]};
  }

  main {
    display: flex;
    flex-direction: column;
    height: calc(100% - ${SPACER[7]});
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
    height: ${SPACER[7]};
    position: relative;
  }

  a {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  @media screen and (min-width: ${WIDTH[1]}) {
    :host {
      padding: ${SPACER[6]};
    }
  }

  @media screen and (min-width: ${WIDTH[3]}) {
    :host {
      padding: ${SPACER[6]};
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
    [
      `${FONT_SIZE[2]} ${FONT_FAMILY[0]}`,
      `${FONT_SIZE[3]} ${FONT_FAMILY[0]}`,
      `${FONT_SIZE[4]} ${FONT_FAMILY[0]}`,
      `${FONT_SIZE[1]} ${FONT_FAMILY[1]}`,
    ].map(async font => window.document.fonts.load(font)),
  );

  class App extends LitElement {
    static get styles() {
      return [ANCHOR_STYLES, FONT_STYLES, SCROLLBAR_STYLES, STYLES];
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

  customElements.define('website-app', App);
}

run();
