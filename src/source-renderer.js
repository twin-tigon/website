import { html, css, LitElement } from 'lit';

import { ANCHOR_STYLES, FONT_STYLES, LIST_STYLES, COLOR, SPACER, WIDTH } from './styles.js';
import { removeLitComments } from './utils.js';

const STYLES = css`
  :host {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: ${SPACER[5]};
  }

  img {
    width: 100%;
  }

  hr {
    border-color: ${COLOR[3]};
  }

  #details h1 {
    margin-bottom: 0;
  }

  #details p {
    margin-top: ${SPACER[4]};
  }

  #details ul {
    margin-top: ${SPACER[4]};
    margin-bottom: 0;
  }

  #details li {
    padding-right: ${SPACER[3]};
  }

  #details li:last-of-type {
    padding-right: 0;
  }

  #details li::before {
    content: '| ';
  }

  #details li:first-of-type::before {
    content: '';
  }

  #keywords a {
    color: ${COLOR[2]};
  }

  #keywords a.selected {
    color: ${COLOR[3]};
  }

  #cards {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    gap: ${SPACER[6]};
  }

  .project {
    border-width: ${SPACER[2]};
    border-color: ${COLOR[3]};
    border-style: solid;
    height: 250px;
    width: 250px;
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
      padding: 0 ${SPACER[7]};
      gap: ${SPACER[7]};
    }
  }

  @media screen and (min-width: ${WIDTH[3]}) {
    :host {
      padding: 0 ${SPACER[8]};
    }
  }
`;

const IMG_URL = '/assets/me.jpg';
const IMG_ALT = 'me';
const NAME_EMAIL = 'Email';

class SourceRenderer extends LitElement {
  static get styles() {
    return [ANCHOR_STYLES, FONT_STYLES, LIST_STYLES, STYLES];
  }

  static get properties() {
    return {
      source: { type: Object },
      _selectedKeyword: { type: String, state: true },
    };
  }

  constructor() {
    super();

    /**
     * @type { import('./types').Content | null }
     */
    this.source = null;
    this._selectedKeyword = null;
  }

  /**
   * @param {MouseEvent & { target: HTMLAnchorElement }} event
   */
  onClick(event) {
    event.preventDefault();

    if (!event.target) {
      return;
    }

    const anchor = event.target;
    const preKeyword = removeLitComments(anchor.innerHTML);

    this._selectedKeyword = preKeyword === this._selectedKeyword ? null : preKeyword;
  }

  render() {
    if (!this.source) {
      return '';
    }

    const { name, description, contactInfo, projects } = this.source;
    const visibleProjects = this._selectedKeyword
      ? projects.filter(({ keywords }) =>
          keywords.some(keyword => this._selectedKeyword === keyword),
        )
      : projects;

    const email = contactInfo.find(({ name: contactName }) => contactName === NAME_EMAIL);
    const socialMedia = contactInfo.filter(({ name: contactName }) => contactName !== NAME_EMAIL);

    const keywords = [
      ...new Set(projects.map(({ keywords: projectKeywords }) => projectKeywords).flat()),
    ];

    return html`
      <div id="details">
        <img src="${IMG_URL}" alt="${IMG_ALT}" />
        <h1>${name}</h1>
        <p>${description}</p>
        <hr />
        <ul>
          ${socialMedia.map(
            ({ name: socialMediaName, value }) =>
              html`
                <li>
                  <a href="${value}" target="_blank" rel="noopener noreferrer nofollow"
                    >${socialMediaName}</a
                  >
                </li>
              `,
          )}
        </ul>
        <p><a href="mailto:${email?.value}">${email?.value}</a></p>
      </div>

      <div id="projects">
        <div id="keywords">
          <ul>
            ${keywords.map(
              keyword =>
                html`
                  <li>
                    <a
                      href="#"
                      @click="${/**
                       *
                       * @param {MouseEvent & { target: HTMLAnchorElement }} event
                       * @returns
                       */
                      event => this.onClick(event)}"
                      class=${!this._selectedKeyword || this._selectedKeyword === keyword
                        ? 'selected'
                        : ''}
                      >${keyword}</a
                    >
                  </li>
                `,
            )}
          </ul>
        </div>

        <div id="cards">
          ${visibleProjects.map(
            ({ name: projectName, description: projectDescription, url }) => html`
              <div class="project">
                <h2>
                  <a href=${url} target="_blank" rel="noopener noreferrer nofollow"
                    >${projectName}</a
                  >
                </h2>
                <p>${projectDescription}</p>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('source-renderer', SourceRenderer);
