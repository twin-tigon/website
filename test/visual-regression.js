import { stat, rmdir, mkdir, readFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
// @ts-ignore
import { expect } from '@esm-bundle/chai/esm/chai.js';

const DIST_PATH = './dist';
const SCREENSHOTS_PATH = './test/__screenshots__';
const DEFAULT_VIEWPORT = {
  width: 1920,
  height: 1080,
};

const updateVisualBaseline = process.argv.includes('--update-visual-baseline');

console.log(process.argv);

/**
 *
 * @param {string} path
 * @returns
 */
async function pathExists(path) {
  let exists;

  try {
    await stat(path);
    exists = true;
  } catch (err) {
    exists = false;
  }

  return exists;
}

/**
 *
 * @param {string} path
 */
async function resetDirectory(path) {
  if (await pathExists(path)) {
    await rmdir(path, { recursive: true });
  }

  await mkdir(path);
}

/**
 *
 * @param {import('puppeteer').Page} page
 * @param {string} filename
 * @returns
 */
async function createOrCompareScreenshotFactory(page, filename) {
  const path = `${SCREENSHOTS_PATH}/${filename}.png`;

  if (updateVisualBaseline) {
    await page.screenshot({ path });
    return;
  }

  async function getScreenshotBuffer() {
    const buffer = await page.screenshot({ encoding: 'binary' });
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Screenshot is not a Buffer');
    }

    return buffer;
  }

  const baseline = PNG.sync.read(await readFile(path));
  const current = PNG.sync.read(await getScreenshotBuffer());

  const numDiffPixels = pixelmatch(
    current.data,
    baseline.data,
    null,
    DEFAULT_VIEWPORT.width,
    DEFAULT_VIEWPORT.height,
    { threshold: 0.1 },
  );

  expect(numDiffPixels).to.equal(0);
}

describe('visual-regression', () => {
  /** @type { import('puppeteer').Browser | undefined } */
  let browser;

  before(async () => {
    const distPathExists = await pathExists(DIST_PATH);
    const screenshotsPathExists = await pathExists(SCREENSHOTS_PATH);

    if (!distPathExists) {
      throw new Error(`Dist path does not exist: ${DIST_PATH}. Run 'npm run build' first.`);
    }

    if (!updateVisualBaseline && !screenshotsPathExists) {
      throw new Error(
        `Screenshots directory does not exist: ${SCREENSHOTS_PATH}. Run with --update-visual-baseline to create it.`,
      );
    }

    if (updateVisualBaseline) {
      resetDirectory(SCREENSHOTS_PATH);
    }

    browser = await puppeteer.launch({
      defaultViewport: DEFAULT_VIEWPORT,
    });
  });

  after(async () => {
    await browser?.close();
  });

  /** @type {import('puppeteer').Page | undefined } */
  let page;

  /**
   * @type {Function | undefined}
   */
  let createOrCompareScreenshot;

  beforeEach(async () => {
    const newPage = await browser?.newPage();
    if (!newPage) {
      throw new Error('Could not create page');
    }

    page = newPage;
    createOrCompareScreenshot = createOrCompareScreenshotFactory.bind(null, newPage);
  });

  it('ok', async () => {
    if (!createOrCompareScreenshot) {
      throw new Error('Could not create createOrCompareScreenshot');
    }

    await page?.goto('http://localhost:8000');
    await createOrCompareScreenshot('ok');

    const sourceAnchor = await page?.$('pierce/footer a');
    await sourceAnchor?.click();
    await createOrCompareScreenshot('showEditor');
  });
});
