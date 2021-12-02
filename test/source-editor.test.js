import { fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/source-editor.js';
import { CONTENT } from '../src/content.js';

describe('source-editor', () => {
  /**
   * @type { import('../src/source-editor').SourceEditor }
   */
  let element;

  beforeEach(async () => {
    element = await fixture('<source-editor></source-editor>');
  });

  it('ok', async () => {
    expect(element).shadowDom.to.equalSnapshot();
    expect(element).to.be.accessible();
  });

  it('source-changed', async () => {
    setTimeout(() => {
      const pre = element.renderRoot.querySelector('pre');
      pre?.dispatchEvent(new KeyboardEvent('keyup'));
    });

    const { detail } = await oneEvent(element, 'source-changed');
    expect(detail?.source).to.deep.equal(CONTENT);
  });
});
