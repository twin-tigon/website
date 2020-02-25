import { html } from 'lit-html';
import { component, useEffect } from 'haunted';
import { COLORS, FONTS, WIDTHS, SPACERS } from './style.js';
import { CONTENT } from './content.js';

const STYLE = html`
  <style>
    :host {
      overflow: scroll;
    }

    pre {
      color: ${COLORS[2]};
      font-family: 'Space Mono', monospace;
      font-size: ${FONTS[1]};
      margin: ${SPACERS[5]};
    }

    @media screen and (min-width: ${WIDTHS[3]}) {
      pre {
        margin: 0;
      }
    }
  </style>
`;

function SourceEditor({ setSource }) {
  useEffect(() => {
    setSource(JSON.parse(CONTENT));
  }, [setSource]);

  return html`
    ${STYLE}
    <pre
      id="source-editor"
      contenteditable="true"
      @keyup=${e => {
        // remove lit-html comment nodes
        const content = e.target.innerHTML.replace(/<!---->/g, '');

        let source;
        try {
          source = JSON.parse(content);
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
          return;
        }

        setSource(source);
      }}
    >
${CONTENT}
    </pre
    >
  `;
}

customElements.define('source-editor', component(SourceEditor));
