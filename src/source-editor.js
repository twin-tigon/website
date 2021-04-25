import { html, css, LitElement } from 'lit';

import { FONT_STYLES, WIDTHS, SPACERS } from './style.js';
import { CONTENT } from './content.js';
import { removeLitComments } from './util.js';

const STYLES = css`
  :host {
    overflow: scroll;
  }

  pre {
    margin: ${SPACERS[5]};
  }

  @media screen and (min-width: ${WIDTHS[3]}) {
    pre {
      margin: 0;
    }
  }
`;
const INDENT_SIZE = 4;

class SourceEditor extends LitElement {
  static get styles() {
    return [FONT_STYLES, STYLES];
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
${JSON.stringify(CONTENT, null, INDENT_SIZE)}
    </pre
      >
    `;
  }
}

customElements.define('source-editor', SourceEditor);
