import { html } from 'lit-html';

export const COLORS = {
  PRIMARY: "rgb(18, 234, 228)",
  SECONDARY: "#01b4bd"
};

export const ANCHOR_STYLES = html`
    a {
      color: ${COLORS.PRIMARY};
    }

    a:visited {
      color: ${COLORS.SECONDARY};
    }
`;

export const FONT_STYLES = html`
    :host {
      font-family: "Bitter", serif;
      color: ${COLORS.PRIMARY};
      font-size: 18px;
    }

    h1 {
      font-size: 24px;
      color: ${COLORS.PRIMARY};
      font-weight: 700;
      margin: 16px auto 0 auto;
    }

    h2 {
      font-size: 20px;
      margin-top: 0;
    }

    @media screen and (min-width: 600px) {
      h1 {
        font-size: 36px;
      }
      
      h2 {
        font-size: 24px;
      }
    }
`;

export const SCROLLBAR_STYLES = html`
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-track {
      background: black;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${COLORS.PRIMARY};
      border-radius: 2px;
    }

    ::-webkit-scrollbar-corner { 
      background: black;
    }

`;