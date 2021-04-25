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
} from './style.js';
import './source-editor.js';
import './html-renderer.js';

const STYLES = css`
  :host {
    background-color: ${COLOR[0]};
    display: block;
    height: calc(100% - ${SPACER[6]});
    width: calc(100% - ${SPACER[6]});
    padding: ${SPACER[5]};
  }

  main {
    display: flex;
    flex-direction: column;
    height: calc(100% - ${SPACER[7]});
  }

  source-editor {
    flex-shrink: 1;
  }

  html-renderer {
    flex-shrink: 1;
    overflow-y: scroll;
  }

  footer {
    height: calc(${SPACER[7]});
    position: relative;
  }

  a {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  @media screen and (min-width: ${WIDTH[1]}) {
    :host {
      height: calc(100% - ${SPACER[7]});
      width: calc(100% - ${SPACER[7]});
      padding: ${SPACER[6]};
    }
  }

  @media screen and (min-width: ${WIDTH[3]}) {
    :host {
      height: calc(100% - ${SPACER[7]});
      width: calc(100% - ${SPACER[7]});
      padding: ${SPACER[6]};
    }

    main {
      flex-direction: row-reverse;
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

    onSourceChanged(event) {
      const { source } = event.detail;
      this._source = source;
    }

    toggleEditorVisibility() {
      this._hideEditor = !this._hideEditor;
    }

    render() {
      return html`
        <main>
          <html-renderer .source=${this._source}></html-renderer>
          <source-editor
            @source-changed=${e => this.onSourceChanged(e)}
            ?hidden=${this._hideEditor}
          ></source-editor>
        </main>
        <footer>
          <a href="#" @click=${() => this.toggleEditorVisibility()}>
            source
          </a>
        </footer>
      `;
    }
  }

  customElements.define('website-app', App);
}

run();
