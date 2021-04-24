import { html, css, LitElement } from 'lit';

import { COLORS, FONTS, WIDTHS, SPACERS } from './style.js';
import { CONTENT } from './content.js';

const STYLE = css`
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
`;

class SourceEditor extends LitElement {
  static get styles() {
    return STYLE;
  }

  static get properties() {
    return {
      setSource: { type: Object },
    };
  }

  constructor() {
    super();

    this.setSource = null;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.setSource) {
      this.setSource(JSON.parse(CONTENT));
    }
  }

  onKeyUp(event) {
    // remove lit-html comment nodes
    const content = event.target.innerHTML.replace(/<!---->/g, '');

    let source;
    try {
      source = JSON.parse(content);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      return;
    }

    if (this.setSource) {
      this.setSource(source);
    }
  }

  render() {
    return html`
      <pre id="source-editor" contenteditable="true" @keyup=${e => this.onKeyUp(e)}>
${CONTENT}
    </pre
      >
    `;
  }
}

customElements.define('source-editor', SourceEditor);
