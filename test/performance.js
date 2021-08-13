#!/usr/bin/env node

import fs from 'fs';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

async function run() {
  // launch chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
    chromePath: '/usr/bin/google-chrome',
  });

  // run lighthouse
  const options = {
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse('http://localhost:8000', options);

  // write hrml report
  const lhReport = 'lhreport.html';
  fs.writeFileSync(lhReport, runnerResult.report);

  // log audits and full report
  const audits = ['cumulative-layout-shift', 'largest-contentful-paint', 'total-blocking-time'];
  for (const audit of audits) {
    const { displayValue, title } = runnerResult.lhr.audits[audit];
    console.log(`${title}: ${displayValue}`);
  }
  console.log(`See full report at ${runnerResult.lhr.finalUrl}${lhReport}`);

  await chrome.kill();
}

run();
