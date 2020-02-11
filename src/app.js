import { html } from 'lit-html';
import { component, useState } from 'haunted';
import { ANCHOR_STYLES, FONT_STYLES, SCROLLBAR_STYLES, COLORS, SPACERS, WIDTHS } from './style.js';
import './source-editor.js';
import './html-renderer.js';

const STYLE = html`
  <style>
    ${ANCHOR_STYLES} ${FONT_STYLES} ${SCROLLBAR_STYLES} :host {
      background-color: ${COLORS[0]};
      display: block;
      height: calc(100% - ${SPACERS[6]});
      width: calc(100% - ${SPACERS[6]});
      padding: ${SPACERS[5]};
    }

    main {
      display: flex;
      flex-direction: column;
      height: calc(100% - ${SPACERS[7]});
    }

    source-editor {
      flex-shrink: 1;
    }

    html-renderer {
      flex-shrink: 1;
      overflow-y: scroll;
    }

    footer {
      height: calc(${SPACERS[7]});
      position: relative;
    }

    a {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    @media screen and (min-width: ${WIDTHS[1]}) {
      :host {
        height: calc(100% - ${SPACERS[7]});
        width: calc(100% - ${SPACERS[7]});
        padding: ${SPACERS[6]};
      }
    }

    @media screen and (min-width: ${WIDTHS[3]}) {
      :host {
        height: calc(100% - ${SPACERS[7]});
        width: calc(100% - ${SPACERS[7]});
        padding: ${SPACERS[6]};
      }

      main {
        flex-direction: row-reverse;
      }

      html-renderer {
        flex-shrink: 2;
      }
    }
  </style>
`;

function App() {
  const [source, setSource] = useState(null);
  const [hideEditor, setHideEditor] = useState(true);

  return html`
    ${STYLE}
    <main>
      <html-renderer .source=${source}></html-renderer>
      <source-editor .setSource=${setSource} ?hidden=${hideEditor}></source-editor>
    </main>
    <footer>
      <a
        href="#"
        @click=${() => {
          setHideEditor(!hideEditor);
        }}
      >
        source
      </a>
    </footer>
  `;
}

customElements.define('website-app', component(App));
