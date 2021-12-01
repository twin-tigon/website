import { html, css, LitElement } from 'lit';

import { HOST_STYLES, ANCHOR_STYLES, FONT_STYLES, LIST_STYLES } from './styles.js';
import { removeLitComments } from './utils.js';

const STYLES = css`
  :host {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: var(--spacer-4);
  }

  img {
    width: 200px;
  }

  hr {
    border-color: var(--color-4);
  }

  #details h1 {
    margin-bottom: 0;
  }

  #details p {
    margin-top: var(--spacer-3);
  }

  #details ul {
    margin-top: var(--spacer-3);
    margin-bottom: 0;
  }

  #details li {
    padding-right: var(--spacer-2);
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
    color: var(--color-3);
  }

  #keywords a.selected {
    color: var(--color-4);
  }

  #cards {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    gap: var(--spacer-5);
  }

  .project {
    border-width: var(--spacer-1);
    border-color: var(--color-4);
    border-style: solid;
    height: 250px;
    width: 250px;
    padding: var(--spacer-4);
  }

  @media screen and (min-width: 500px) {
    img {
      width: 300px;
    }
  }

  @media screen and (min-width: 1000px) {
    :host {
      flex-direction: row;
      padding: 0 var(--spacer-6);
      gap: var(--spacer-6);
    }

    img {
      width: 350px;
    }
  }

  @media screen and (min-width: 1500px) {
    :host {
      padding: 0 var(--spacer-7);
    }

    img {
      width: 400px;
    }
  }
`;

const IMG_URL = '/assets/me.jpg';
const IMG_ALT = 'me';
const NAME_EMAIL = 'Email';

class SourceRenderer extends LitElement {
  static get styles() {
    return [HOST_STYLES, ANCHOR_STYLES, FONT_STYLES, LIST_STYLES, STYLES];
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
