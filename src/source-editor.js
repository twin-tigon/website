import { html } from "lit-html";
import { component, useEffect } from "haunted";
import { COLORS } from "./style.js";

const CONTENT = `{
    "name": "Rodrigo García León",
    "description": "Full Stack Developer 🙌✨",
    "projects": [
        {
            "name": "react-hnpwa",
            "description": "Hacker News PWA built with React Hooks",
            "url": "https://github.com/rodrigo-garcia-leon/react-hnpwa",
            "keywords": ["frontend", "react", "pwa", "js"]
        },
        {
            "name": "hn-api",
            "description": "Hacker News API using GraphQL",
            "url": "https://github.com/rodrigo-garcia-leon/hn-api",
            "keywords": ["backend", "koa", "graphql", "nodejs", "js"]
        },
        {
            "name": "rodrigogarcia-website",
            "description": "My website",
            "url": "https://github.com/rodrigo-garcia-leon/rodrigogarcia-website",
            "keywords": ["frontend", "haunted", "lit-html", "snowpack", "webcomponents", "js"]
        },
        {
            "name": "hn-hiring-explorer",
            "description": "Hacker News Hiring Explorer PWA built with Svelte",
            "url": "https://github.com/rodrigo-garcia-leon/hn-hiring-explorer",
            "keywords": ["frontend", "svelte", "pwa", "js"]
        },
        {
            "name": "todo-lists",
            "description": "Todo app built with React Native and Django",
            "url": "https://github.com/rodrigo-garcia-leon/todo-lists",
            "keywords": ["react-native", "django", "postgresql", "js", "python"]
        },
        {
            "name": "gcp-devops",
            "description": "Collection of scripts to manage Google Cloud Platform and Kubernetes",
            "url": "https://github.com/rodrigo-garcia-leon/gcp-devops",
            "keywords": ["devops", "gcp", "kubernetes", "shell"]
        },
        {
            "name": "glissando-app",
            "description": "A web-based digital audio workstation using the web platform APIs (Web Audio, Web MIDI) and WebAssembly",
            "url": "https://github.com/glissando-daw/glissando-app",
            "keywords": ["frontend", "web-audio", "wasm", "rust", "js"]
        },
        {
            "name": "web-hacks",
            "description": "Web Hacks 🕸🤓",
            "url": "https://github.com/rodrigo-garcia-leon/web-hacks",
            "keywords": ["frontend", "js"]
        },
        {
            "name": "tictactoe-rust",
            "description": "Tic-tac-toe implementation in Rust",
            "url": "https://github.com/rodrigo-garcia-leon/tictactoe-rust",
            "keywords": ["cli", "gamedev", "rust"]
        },
        {
            "name": "thesis-matlab",
            "description": "Collection of MATLAB scripts and toolboxes regarding my Master Thesis on psychoacoustics",
            "url": "https://github.com/rodrigo-garcia-leon/thesis-matlab",
            "keywords": ["matlab", "dsp", "psychoacoustics"]
        },
        {
            "name": "dotfiles",
            "description": "My dotfiles",
            "url": "https://github.com/rodrigo-garcia-leon/dotfiles",
            "keywords": ["dotfiles", "shell"]
        },
        {
            "name": "cv",
            "description": "My CV",
            "url": "https://github.com/rodrigo-garcia-leon/my-cv",
            "keywords": ["cv"]
        }
    ],
    "contact": [
        {
            "name": "Twitter",
            "value": "https://twitter.com/garcialeonrodri"
        },
        {
            "name": "Instagram",
            "value": "https://www.instagram.com/rodrigogarcialeon/"
        },
        {
            "name": "LinkedIn",
            "value": "https://www.linkedin.com/in/rgarcialeon/"
        },
        {
            "name": "Email",
            "value": "yo@rodrigogarcia.me"
        }
    ]
}`;

const STYLE = html`
  <style>
    :host {
      margin: 0;
      padding: 0;
      overflow: scroll;
    }

    pre {
      color: ${COLORS.PRIMARY};
      font-family: "Space Mono", monospace;
      font-size: 14px;
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
        const innerHTML = e.target.innerHTML.replace(/<!---->/g, "");

        let source;
        try {
          source = JSON.parse(innerHTML);
        } catch (e) {
          console.error(e);
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

customElements.define("rodrigogarcia-source-editor", component(SourceEditor));
