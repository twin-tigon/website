import { html } from 'lit-html';

export const COLORS = ['#000000', '#01b4bd', '#12eae4'];

export const FONTS = [0, '14px', '18px', '24px', '32px'];

export const SPACERS = [
  0, // 0
  '1px', // 1
  '2px', // 2
  '4px', // 3
  '8px', // 4
  '16px', // 5
  '32px', // 6
  '64px', // 7
];

export const WIDTHS = [0, '500px', '1000px', '1500px'];

export const ANCHOR_STYLES = html`
  a { color: ${COLORS[1]}; } a:visited { color: ${COLORS[2]}; }
`;

export const FONT_STYLES = html`
  :host { font-family: "Bitter", serif; color: ${COLORS[1]}; font-size: ${FONTS[2]}; } h1 {
  font-size: ${FONTS[3]}; color: ${COLORS[2]}; font-weight: 700; margin: 16px auto 0 auto; } h2 {
  font-size: ${FONTS[2]}; font-weight: 700; margin-top: 0; } @media screen and (min-width:
  ${WIDTHS[1]}) { h1 { font-size: ${FONTS[4]}; } h2 { font-size: ${FONTS[3]}; } }
`;

export const SCROLLBAR_STYLES = html`
  ::-webkit-scrollbar { width: ${SPACERS[3]}; height: ${SPACERS[3]}; } ::-webkit-scrollbar-track {
  background: ${COLORS[0]}; } ::-webkit-scrollbar-thumb { background-color: ${COLORS[1]};
  border-radius: ${SPACERS[2]}; } ::-webkit-scrollbar-corner { background: ${COLORS[0]}; } :host {
  scrollbar-color: ${COLORS[1]} ${COLORS[0]}; scrollbar-width: thin; }
`;

export const LIST_STYLES = html`
  ul { display: flex; list-style-type: none; padding: 0; margin-bottom: ${SPACERS[4]}; } li {
  padding-left: ${SPACERS[3]}; } li:first-of-type::before { content: ''; } li:first-of-type {
  padding-left: 0; } li::before { content: '| '; }
`;
