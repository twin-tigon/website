import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
  files: ['test/**/*.test.js'],
  nodeResolve: true,
  browsers: [
    puppeteerLauncher({
      launchOptions: {
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-sandbox',
        ],
      },
    }),
  ],
};
