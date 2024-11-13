/* eslint-disable no-await-in-loop, no-continue  */
import { stat, rm, mkdir, readFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
// @ts-ignore
import { expect } from '@esm-bundle/chai/esm/chai.js';

const DIST_PATH = './dist';
const SCREENSHOTS_PATH = './test/__screenshots__';

const VIEWPORTS = [
  {
    width: 1920,
    height: 1080,
  },
  {
    width: 1440,
    height: 900,
  },
  {
    width: 800,
    height: 1280,
  },
  {
    width: 360,
    height: 740,
  },
];

const updateVisualBaseline = process.argv.includes('--update-visual-baseline');

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
    await rm(path, { recursive: true });
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
  async function getScreenshotBuffer() {
    const screenshot = await page.screenshot({ encoding: 'binary' });
    const buffer = Buffer.from(screenshot);
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Screenshot is not a Buffer');
    }

    return buffer;
  }

  for (const viewport of VIEWPORTS.reverse()) {
    const { width, height } = viewport;
    const path = `${SCREENSHOTS_PATH}/${filename}-${width}x${height}.png`;

    await page.setViewport(viewport);

    if (updateVisualBaseline) {
      await page.screenshot({ path });
      continue;
    }

    const baseline = PNG.sync.read(await readFile(path));
    const current = PNG.sync.read(await getScreenshotBuffer());
    const numDiffPixels = pixelmatch(
      current.data,
      baseline.data,
      null,
      viewport.width,
      viewport.height,
      { threshold: 0.1 },
    );

    expect(numDiffPixels).to.equal(0);
  }
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
      defaultViewport: VIEWPORTS[0],
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
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
    await createOrCompareScreenshot('show-editor');
  }).timeout(5000);
});
