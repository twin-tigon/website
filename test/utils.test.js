import { expect } from '@open-wc/testing';

import { removeLitComments } from '../src/utils.js';
import { CONTENT } from '../src/content.js';

const CONTENT_STRING = `<!--?lit$14090330355$-->{
  "name": "Rodrigo García León",
  "description": "Full Stack Developer 🙌✨",
  "projects": [
    {
      "name": "website",
      "description": "This website 👀",
      "url": "https://github.com/twin-tigon/website",
      "keywords": [
        "front-end",
        "lit",
        "web-components",
        "open-wc",
        "modern-web",
        "esbuild",
        "skypack",
        "javascript"
      ]
    },
    {
      "name": "esbuild-skypack-resolver",
      "description": "An esbuild plugin to resolve package names to Skypack CDN URLs",
      "url": "https://github.com/twin-tigon/esbuild-skypack-resolver",
      "keywords": ["esbuild", "plugin", "skypack", "typescript"]
    },
    {
      "name": "hypermodern-python-talk",
      "description": "Resources for the Hypermodern Web Development using Python and FastAPI talk",
      "url": "https://github.com/twin-tigon/hypermodern-python-talk",
      "keywords": ["python", "fastapi", "typescript", "vue", "slidev"]
    },
    {
      "name": "web-hacks",
      "description": "Web Hacks 🕸🤓",
      "url": "https://github.com/twin-tigon/web-hacks",
      "keywords": ["front-end", "houdini", "javascript"]
    },
    {
      "name": "chat-groups-app",
      "description": "Slack clone app built with React",
      "url": "https://github.com/twin-tigon/chat-groups-app",
      "keywords": ["front-end", "react", "web-sockets", "javascript"]
    },
    {
      "name": "chat-groups-api",
      "description": "Slack clone API built with Django",
      "url": "https://github.com/twin-tigon/chat-groups-api",
      "keywords": [
        "back-end",
        "django",
        "web-sockets",
        "postgresql",
        "redis",
        "docker",
        "python"
      ]
    },
    {
      "name": "thesis-matlab",
      "description": "Collection of MATLAB scripts and toolboxes regarding my Master Thesis on psychoacoustics",
      "url": "https://github.com/twin-tigon/thesis-matlab",
      "keywords": ["psychoacoustics", "digital-signal-processing", "matlab"]
    },
    {
      "name": "authentication-api",
      "description": "Authentication API using JWT built with Go and Redis",
      "url": "https://github.com/twin-tigon/authentication-api",
      "keywords": ["back-end", "jwt", "redis", "go"]
    },
    {
      "name": "glissando-daw",
      "description": "A web-based digital audio workstation using the web platform APIs (Web Audio, Web MIDI) and WebAssembly",
      "url": "https://github.com/glissando-daw/glissando-daw",
      "keywords": [
        "front-end",
        "web-audio",
        "web-assembly",
        "rust",
        "javascript"
      ]
    },
    {
      "name": "hn-app",
      "description": "Hacker News PWA built with React Hooks",
      "url": "https://github.com/twin-tigon/hn-app",
      "keywords": ["front-end", "progressive-web-app", "react", "javascript"]
    },
    {
      "name": "hn-api",
      "description": "Hacker News API using GraphQL",
      "url": "https://github.com/twin-tigon/hn-api",
      "keywords": ["back-end", "koa", "graphql", "nodejs", "javascript"]
    },
    {
      "name": "cloud",
      "description": "Collection of scripts to manage Google Cloud Platform and Kubernetes ☁️",
      "url": "https://github.com/twin-tigon/cloud",
      "keywords": ["devops", "google-cloud-platform", "kubernetes", "shell"]
    },
    {
      "name": "tictactoe-cli",
      "description": "Tic-tac-toe implementation in Rust",
      "url": "https://github.com/twin-tigon/tictactoe-rust",
      "keywords": ["cli", "gamedev", "rust"]
    },
    {
      "name": "senescence",
      "description": "Senescence is a narrative puzzle platformer made for GMTK Game Jam 2020 ",
      "url": "https://github.com/twin-tigon/senescence",
      "keywords": [
        "gamedev",
        "game-jam",
        "platform-game",
        "puzzle-game",
        "godot"
      ]
    }
  ],
  "contactInfo": [
    {
      "name": "Twitter",
      "value": "https://twitter.com/twin_tigon"
    },
    {
      "name": "Instagram",
      "value": "https://www.instagram.com/twin_tigon"
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

describe('utils', () => {
  describe('removeLitComments', () => {
    it('ok', () => {
      expect(JSON.parse(removeLitComments(CONTENT_STRING))).to.deep.equal(CONTENT);
    });
  });
});
