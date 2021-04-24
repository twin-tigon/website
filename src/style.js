import { css } from 'lit';

export const COLORS = [css`#000000`, css`#01b4bd`, css`#12eae4`];

export const FONTS = [css`0`, css`14px`, css`18px`, css`24px`, css`32px`];

export const SPACERS = [
  css`0`, // 0
  css`1px`, // 1
  css`2px`, // 2
  css`4px`, // 3
  css`8px`, // 4
  css`16px`, // 5
  css`32px`, // 6
  css`64px`, // 7
];

export const WIDTHS = [css`0`, css`500px`, css`1000px`, css`1500px`];

export const ANCHOR_STYLES = css`
  a {
    color: ${COLORS[1]};
  }
  a:visited {
    color: ${COLORS[2]};
  }
`;

export const FONT_STYLES = css`
  :host {
    font-family: 'Bitter', serif;
    color: ${COLORS[1]};
    font-size: ${FONTS[2]};
  }
  h1 {
    font-size: ${FONTS[3]};
    color: ${COLORS[2]};
    font-weight: 700;
  }
  h2 {
    font-size: ${FONTS[2]};
    font-weight: 700;
  }
  @media screen and (min-width: ${WIDTHS[1]}) {
    h1 {
      font-size: ${FONTS[4]};
    }
    h2 {
      font-size: ${FONTS[3]};
    }
  }
`;

export const SCROLLBAR_STYLES = css`
  ::-webkit-scrollbar {
    width: ${SPACERS[3]};
    height: ${SPACERS[3]};
  }
  ::-webkit-scrollbar-track {
    background: ${COLORS[0]};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS[1]};
    border-radius: ${SPACERS[2]};
  }
  ::-webkit-scrollbar-corner {
    background: ${COLORS[0]};
  }
  :host {
    scrollbar-color: ${COLORS[0]};
    scrollbar-width: thin;
  }
`;

export const LIST_STYLES = css`
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin-bottom: ${SPACERS[4]};
  }
  li {
    padding-left: ${SPACERS[3]};
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
