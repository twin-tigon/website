import { fixture, expect } from '@open-wc/testing';

import '../src/source-renderer.js';

describe('source-renderer', () => {
  /**
   * @type { import('../src/source-renderer').SourceRenderer }
   */
  let element;

  beforeEach(async () => {
    element = await fixture('<source-renderer></source-renderer>');
  });

  it('empty', () => {
    expect(element).dom.to.equal('<source-renderer>\n</source-renderer>\n');
  });
});
