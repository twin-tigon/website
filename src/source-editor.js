import { html, css, LitElement } from 'lit';

import { COLORS, FONTS, WIDTHS, SPACERS } from './style.js';
import { CONTENT } from './content.js';
import { removeLitComments } from './utils.js';

const STYLES = css`
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
    return [STYLES];
  }

  updateSource() {
    const pre = this.shadowRoot.getElementById('source-editor');
    const content = removeLitComments(pre.innerHTML);

    let source;
    try {
      source = JSON.parse(content);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      return;
    }

    const event = new CustomEvent('source-changed', {
      detail: {
        source,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  firstUpdated() {
    this.updateSource();
  }

  render() {
    return html`
      <pre id="source-editor" contenteditable="true" @keyup=${() => this.updateSource()}>
${CONTENT}
    </pre
      >
    `;
  }
}

customElements.define('source-editor', SourceEditor);
