import { css, unsafeCSS } from 'lit';

export const COLOR = [
  unsafeCSS`#000000`,
  unsafeCSS`rgb(0 207 218 / 11%)`,
  unsafeCSS`#01b4bd`,
  unsafeCSS`#12eae4`,
];

export const FONT_SIZE = [
  unsafeCSS`0`,
  unsafeCSS`14px`,
  unsafeCSS`18px`,
  unsafeCSS`24px`,
  unsafeCSS`32px`,
];
export const FONT_FAMILY = [unsafeCSS`Bitter`, unsafeCSS`Space Mono`];

export const SPACER = [
  unsafeCSS`0`, // 0
  unsafeCSS`1px`, // 1
  unsafeCSS`2px`, // 2
  unsafeCSS`4px`, // 3
  unsafeCSS`8px`, // 4
  unsafeCSS`16px`, // 5
  unsafeCSS`32px`, // 6
  unsafeCSS`64px`, // 7
];

export const WIDTH = [unsafeCSS`0`, unsafeCSS`500px`, unsafeCSS`1000px`, unsafeCSS`1500px`];

export const ANCHOR_STYLES = css`
  a {
    color: ${COLOR[2]};
  }
  a:visited {
    color: ${COLOR[3]};
  }
`;

export const FONT_STYLES = css`
  :host {
    font-family: '${FONT_FAMILY[0]}', serif;
    color: ${COLOR[2]};
    font-size: ${FONT_SIZE[2]};
  }
  ::-moz-selection {
    background: ${COLOR[1]};
  }
  ::selection {
    background: ${COLOR[1]};
  }
  h1 {
    font-size: ${FONT_SIZE[3]};
    color: ${COLOR[3]};
    font-weight: 700;
  }
  h2 {
    font-size: ${FONT_SIZE[2]};
    font-weight: 700;
  }
  pre {
    color: ${COLOR[3]};
    font-family: '${FONT_FAMILY[1]}', monospace;
    font-size: ${FONT_SIZE[1]};
  }
  @media screen and (min-width: ${WIDTH[1]}) {
    h1 {
      font-size: ${FONT_SIZE[4]};
    }
    h2 {
      font-size: ${FONT_SIZE[3]};
    }
  }
`;

export const SCROLLBAR_STYLES = css`
  ::-webkit-scrollbar {
    width: ${SPACER[3]};
    height: ${SPACER[3]};
  }
  ::-webkit-scrollbar-track {
    background: ${COLOR[0]};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR[2]};
    border-radius: ${SPACER[2]};
  }
  ::-webkit-scrollbar-corner {
    background: ${COLOR[0]};
  }
  :host {
    scrollbar-color: ${COLOR[0]};
    scrollbar-width: thin;
  }
`;

export const LIST_STYLES = css`
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin-bottom: ${SPACER[4]};
  }
  li {
    padding-left: ${SPACER[3]};
  }
  li:first-of-type::before {
    content: '';
  }
  li:first-of-type {
    padding-left: 0;
  }
  li::before {
    content: '| ';
  }
`;
