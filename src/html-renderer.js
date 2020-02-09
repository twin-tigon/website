/* eslint lit/no-invalid-html: 0 */

import { html } from 'lit-html';
import { component, useState } from 'haunted';
import { ANCHOR_STYLES, FONT_STYLES, COLORS } from './style.js';

const STYLE = html`
  <style>
    ${ANCHOR_STYLES} ${FONT_STYLES} :host {
      display: block;
      width: 100%;
      margin: 0;
    }

    img {
      width: 100%;
    }

    hr {
      color: ${COLORS.PRIMARY};
    }

    ul {
      display: flex;
      list-style-type: none;
      padding: 0;
      margin-bottom: 8px;
    }

    li {
      padding-left: 4px;
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

    p {
      margin-top: 0;
    }

    #main {
      display: flex;
      margin: 0 auto;
      width: 90%;
      height: 95%;
      flex-flow: row wrap;
    }

    section {
      margin: 0;
    }

    #me {
      padding-right: 32px;
    }

    #projects {
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 100%;
    }

    #cards {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      height: 100%;
      align-content: flex-start;
    }

    #keywords {
      padding-bottom: 32px;
    }

    #keywords a {
      font-size: 18px;
      margin-right: 16px;
    }

    .project {
      border: 2px ${COLORS.PRIMARY} solid;
      height: 250px;
      width: 250px;
      margin: 0 16px 32px 0;
      padding: 8px 16px;
    }

    @media screen and (min-width: 600px) {
      img {
        width: 400px;
      }
    }

    @media screen and (min-width: 1500px) {
      #main {
        flex-flow: row;
        width: 70%;
      }

      #keywords a {
        font-size: 20px;
      }
    }
  </style>
`;

const IMG_URL = '/img/me.jpg';
const NAME_EMAIL = 'Email';

function HtmlRenderer({ source }) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  if (!source) {
    return '';
  }

  const { name, description, contact, projects } = source;
  const filteredProjects =
    selectedKeywords.length === 0
      ? projects
      : projects.filter(({ keywords }) =>
          keywords.some(keyword => selectedKeywords.includes(keyword)),
        );

  const email = contact.find(({ name: contactName }) => contactName === NAME_EMAIL);
  const socialMedia = contact.filter(({ name: socialMediaName }) => socialMediaName !== NAME_EMAIL);
  const keywords = [
    ...new Set(projects.map(({ keywords: projectKeywords }) => projectKeywords).flat()),
  ];

  return html`
    ${STYLE}
    <div id="main">
      <section id="me">
        <img src="${IMG_URL}" />
        <h1>${name}</h1>
        <h2>${description}</h2>
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
        <div id="keywords">
          ${keywords.map(
            keyword =>
              html`
                <a
                  href="#"
                  @click="${e => {
                    const preKeyword = e.target.innerHTML.replace(/<!---->/g, '');

                    setSelectedKeywords([preKeyword]);
                  }}"
                  >${keyword}</a
                >
              `,
          )}
        </div>
        <div id="cards">
          ${filteredProjects.map(
            ({ name: projectName, description: projectDescription, url }) => html`
              <div class="project">
                <h3><a href=${url}>${projectName}</a></h3>
                <h4>${projectDescription}</h4>
              </div>
            `,
          )}
        </div>
      </section>
    </div>
  `;
}

customElements.define('rodrigogarcia-html-renderer', component(HtmlRenderer));
