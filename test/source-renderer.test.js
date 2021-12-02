import { fixture, expect } from '@open-wc/testing';

import '../src/source-renderer.js';
import { CONTENT } from '../src/content.js';

describe('source-renderer', () => {
  /**
   * @type { import('../src/source-renderer').SourceRenderer }
   */
  let element;

  beforeEach(async () => {
    element = await fixture('<source-renderer></source-renderer>');
  });

  it('empty', () => {
    expect(element).shadowDom.to.be.empty;
  });

  it('ok', async () => {
    element.source = CONTENT;
    await element.updateComplete;

    expect(element).shadowDom.to.equalSnapshot();
  });

  it('_selectedKeyword', async () => {
    element.source = CONTENT;
    await element.updateComplete;

    const keywords = element.renderRoot.querySelectorAll('#keywords a');

    /** @type { HTMLAnchorElement | undefined } */
    const frontendKeyword = Array.from(keywords).find(
      keyword => keyword.textContent === 'frontend',
    );

    frontendKeyword?.click();
    await element.updateComplete;

    expect(element).shadowDom.to.equalSnapshot();
  });
});
