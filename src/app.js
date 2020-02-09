import { html } from "lit-html";
import { component, useState } from "haunted";
import { ANCHOR_STYLES, FONT_STYLES, SCROLLBAR_STYLES } from "./style.js";
import "./source-editor.js";
import "./html-renderer.js";

const STYLE = html`
  <style>
    ${ANCHOR_STYLES}
    ${FONT_STYLES}
    ${SCROLLBAR_STYLES}

    :host {
      background-color: black;
      display: flex;
      flex-direction: column;
      height: calc(100% - 64px);
      width: calc(100% - 64px);
      padding: 32px;
    }

    main {
      display: flex;
      flex-direction: row;
      height: calc(100% - 64px);
    }

    footer {
      margin: 32px 0 0 0;
    }

    rodrigogarcia-source-editor {
      width: 50%;
    }

    rodrigogarcia-html-renderer {
      height: 100%;
      overflow-y: scroll;
    }
  </style>
`;

function App() {
  const [source, setSource] = useState(null);
  const [hideEditor, setHideEditor] = useState(true);

  return html`
    ${STYLE}
    <main>
      <rodrigogarcia-source-editor
        .setSource=${setSource}
        ?hidden=${hideEditor}
      ></rodrigogarcia-source-editor>
      <rodrigogarcia-html-renderer
        .source=${source}
      ></rodrigogarcia-html-renderer>
    </main>
    <footer>
      <a href="#"
        @click=${e => {
          setHideEditor(!hideEditor);
        }}
      >
        source
      </a>
    </footer>
  `;
}

customElements.define("rodrigogarcia-app", component(App));
