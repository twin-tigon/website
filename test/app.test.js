import { fixture, expect } from '@open-wc/testing';

import '../src/app.js';

describe('website-app', () => {
  /** @type { import('../src/app').WebsiteApp } */
  let element;

  beforeEach(async () => {
    element = await fixture('<website-app></website-app>');
  });

  it('ok', async () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('_hideEditor', async () => {
    /** @type { HTMLAnchorElement | undefined } */
    const sourceAnchor = element.renderRoot.querySelector('a');
    sourceAnchor?.click();

    await element.updateComplete;

    expect(element).shadowDom.to.equalSnapshot();
  });
});
