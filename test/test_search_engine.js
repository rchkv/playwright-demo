const { chromium } = require('playwright');
const assert = require('assert');

let browser;
let page;

before(async () => {
  browser = await chromium.launch();
});

after(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe('test duckduckgo title', function () {
  it('on the main page', async () => {
    await page.goto('https://duckduckgo.com/');
    assert.equal(await page.title(), 'DuckDuckGo — Privacy, simplified.');
  });

  it('on the result page', async () => {
    await page.goto('https://duckduckgo.com/?q=test');
    assert.equal(await page.title(), 'test at DuckDuckGo');
  });
});

describe('test google', function () {
  it('when the first result is article on wikipedia', async () => {
    await page.goto('https://google.com');

    await Promise.all([
      page.fill('[name="q"]', 'утка'),
      page.press('[name="q"]', 'Enter'),
      page.waitForSelector('.g:first-child div h3')
    ]);
    const sidebarTitle = await page.$eval('.g:first-child div h3', e => e.textContent);
    assert.equal(sidebarTitle, 'Утки — Википедия');
  });
});
