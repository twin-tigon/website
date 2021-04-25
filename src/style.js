import { css } from 'lit';

export const COLOR = [css`#000000`, css`#01b4bd`, css`#12eae4`];

export const FONT_SIZE = [css`0`, css`14px`, css`18px`, css`24px`, css`32px`];
export const FONT_FAMILY = [css`Bitter`, css`Space Mono`];

export const SPACER = [
  css`0`, // 0
  css`1px`, // 1
  css`2px`, // 2
  css`4px`, // 3
  css`8px`, // 4
  css`16px`, // 5
  css`32px`, // 6
  css`64px`, // 7
];

export const WIDTH = [css`0`, css`500px`, css`1000px`, css`1500px`];

export const ANCHOR_STYLES = css`
  a {
    color: ${COLOR[1]};
  }
  a:visited {
    color: ${COLOR[2]};
  }
`;

export const FONT_STYLES = css`
  :host {
    font-family: ${FONT_FAMILY[0]}, serif;
    color: ${COLOR[1]};
    font-size: ${FONT_SIZE[2]};
  }
  h1 {
    font-size: ${FONT_SIZE[3]};
    color: ${COLOR[2]};
    font-weight: 700;
  }
  h2 {
    font-size: ${FONT_SIZE[2]};
    font-weight: 700;
  }
  pre {
    color: ${COLOR[2]};
    font-family: ${FONT_FAMILY[1]}, monospace;
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
    background-color: ${COLOR[1]};
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
