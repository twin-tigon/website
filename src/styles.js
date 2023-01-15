import { css } from 'lit';

export const HOST_STYLES = css`
  :host {
    --color-1: #000000;
    --color-2: rgb(0 207 218 / 11%);
    --color-3: #01b4bd;
    --color-4: #12eae4;

    --font-family-1: 'Bitter', serif;
    --font-family-2: 'Space Mono', monospace;

    --font-size-1: 14px;
    --font-size-2: 16px;
    --font-size-3: 20px;
    --font-size-4: 24px;

    --spacer-1: 2px;
    --spacer-2: 4px;
    --spacer-3: 8px;
    --spacer-4: 16px;
    --spacer-5: 32px;
    --spacer-6: 64px;
    --spacer-7: 256px;
  }
`;

export const ANCHOR_STYLES = css`
  a {
    color: var(--color-3);
  }
  a:visited {
    color: var(--color-4);
  }
`;

export const FONT_STYLES = css`
  :host {
    font-family: var(--font-family-1);
    color: var(--color-3);
    font-size: var(--font-size-2);
  }
  ::-moz-selection {
    background: var(--color-2);
  }
  ::selection {
    background: var(--color-2);
  }
  h1 {
    font-size: var(--font-size-3);
    color: var(--color-4);
    font-weight: 700;
  }
  h2 {
    font-size: var(--font-size-2);
    font-weight: 700;
  }
  pre {
    color: var(--color-4);
    font-family: var(--font-family-2);
    font-size: var(--font-size-1);
  }
  @media screen and (min-width: 500px) {
    h1 {
      font-size: var(--font-size-4);
    }
    h2 {
      font-size: var(--font-size-3);
    }
  }
`;

export const SCROLLBAR_STYLES = css`
  ::-webkit-scrollbar {
    width: var(--spacer-2);
    height: var(--spacer-2);
  }
  ::-webkit-scrollbar-track {
    background: var(--color-1);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-3);
    border-radius: var(--spacer-1);
  }
  ::-webkit-scrollbar-corner {
    background: var(--color-1);
  }
`;

export const LIST_STYLES = css`
  ul {
    display: inline-block;
    list-style-type: none;
    padding: 0;
    margin-top: 0;
  }
  li {
    display: inline;
    padding-right: var(--spacer-4);
  }
  li:last-of-type {
    padding-right: 0;
  }
`;
