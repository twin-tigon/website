import { html, css, LitElement } from 'lit';

import { ANCHOR_STYLES, FONT_STYLES, LIST_STYLES, COLORS, SPACERS, WIDTHS } from './style.js';
import { removeLitComments } from './utils.js';

const STYLE = css`
    ${ANCHOR_STYLES} ${FONT_STYLES} ${LIST_STYLES}
    
    :host {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
    }

    img {
      width: 100%;
    }

    hr {
      border-color: ${COLORS[2]};
    }

    #me {
      padding-right: ${SPACERS[5]};
    }

    #me h1 {
      margin-bottom: 0;
    }

    #me p {
      margin-top: ${SPACERS[4]};
    }

    #keywords p {
      margin-top: 0;
    }

    #keywords a {
      margin-right: ${SPACERS[5]};
    }

    #cards {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
    }

    .project {
      border: ${SPACERS[2]} ${COLORS[2]} solid;
      height: 250px;
      width: 250px;
      margin: 0 ${SPACERS[6]} ${SPACERS[6]} 0;
      padding: ${SPACERS[5]};
    }

    @media screen and (min-width: ${WIDTHS[1]}) {
      img {
        width: 400px;
      }
    }

    @media screen and (min-width: ${WIDTHS[2]}) {
      :host {
        flex-direction: row;
        padding: 0 5%;
      }

      #me {
        padding-right: ${SPACERS[7]};
      }
    }

    @media screen and (min-width: ${WIDTHS[3]}) {
      :host {
        padding: 0 10%;
      }
    }
`;

const IMG_URL = '/img/me.jpg';
const NAME_EMAIL = 'Email';

class HtmlRenderer extends LitElement {
  static get styles() {
    return STYLE;
  }

  static get properties() {
    return {
      source: { type: Object },
      _selectedKeywords: { type: Array, state: true },
    };
  }

  constructor() {
    super();

    this.source = null;
    this._selectedKeywords = [];
  }

  onClick(event) {
    const preKeyword = removeLitComments(event.target.innerHTML);

    this._selectedKeywords = [preKeyword];
  }

  render() {
    if (!this.source) {
      return '';
    }

    const { name, description, contact, projects } = this.source;
    const filteredProjects =
      this._selectedKeywords.length === 0
        ? projects
        : projects.filter(({ keywords }) =>
            keywords.some(keyword => this._selectedKeywords.includes(keyword)),
          );

    const email = contact.find(({ name: contactName }) => contactName === NAME_EMAIL);
    const socialMedia = contact.filter(
      ({ name: socialMediaName }) => socialMediaName !== NAME_EMAIL,
    );
    const keywords = [
      ...new Set(projects.map(({ keywords: projectKeywords }) => projectKeywords).flat()),
    ];

    return html`
      <section id="me">
        <img src="${IMG_URL}" />
        <h1>${name}</h1>
        <p>${description}</p>
        <hr />
        <ul>
          ${socialMedia.map(
            ({ name: socialMediaName, value }) =>
              html`
                <li><a href="${value}">${socialMediaName}</a></li>
              `,
          )}
        </ul>
        <p><a href="mailo:${email.value}">${email.value}</a></p>
      </section>
      <section id="projects">
        <section id="keywords">
          <p>
            ${keywords.map(
              keyword =>
                html`
                  <a href="#" @click="${e => this.onClick(e)}">${keyword}</a>
                `,
            )}
          </p>
        </section>
        <section id="cards">
          ${filteredProjects.map(
            ({ name: projectName, description: projectDescription, url }) => html`
              <div class="project">
                <h2><a href=${url}>${projectName}</a></h2>
                <p>${projectDescription}</p>
              </div>
            `,
          )}
        </section>
      </section>
    `;
  }
}

customElements.define('html-renderer', HtmlRenderer);
