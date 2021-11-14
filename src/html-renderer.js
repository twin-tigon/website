import { html, css, LitElement } from 'lit';

import { ANCHOR_STYLES, FONT_STYLES, LIST_STYLES, COLOR, SPACER, WIDTH } from './style.js';
import { removeLitComments } from './util.js';

const STYLES = css`
  :host {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  img {
    width: 100%;
  }

  hr {
    border-color: ${COLOR[2]};
  }

  #me {
    padding-right: ${SPACER[5]};
  }

  #me h1 {
    margin-bottom: 0;
  }

  #me p {
    margin-top: ${SPACER[4]};
  }

  #keywords p {
    margin-top: 0;
  }

  #keywords a {
    margin-right: ${SPACER[5]};
  }

  #cards {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }

  .project {
    border-width: ${SPACER[2]};
    border-color: ${COLOR[2]};
    border-style: solid;
    height: 250px;
    width: 250px;
    margin-top: 0;
    margin-right: ${SPACER[6]};
    margin-bottom: ${SPACER[6]};
    margin-left: 0;
    padding: ${SPACER[5]};
  }

  @media screen and (min-width: ${WIDTH[1]}) {
    img {
      width: 400px;
    }
  }

  @media screen and (min-width: ${WIDTH[2]}) {
    :host {
      flex-direction: row;
      padding: 0 5%;
    }

    #me {
      padding-right: ${SPACER[7]};
    }
  }

  @media screen and (min-width: ${WIDTH[3]}) {
    :host {
      padding: 0 10%;
    }
  }
`;

const IMG_URL = '/assets/me.jpg';
const IMG_ALT = 'me';
const NAME_EMAIL = 'Email';

class HtmlRenderer extends LitElement {
  static get styles() {
    return [ANCHOR_STYLES, FONT_STYLES, LIST_STYLES, STYLES];
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
        <img src="${IMG_URL}" alt="${IMG_ALT}" />
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
