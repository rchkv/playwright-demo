const {chromium} = require('playwright');
const assert = require('assert');

let browser;
let page;

before(async() => {
  browser = await chromium.launch();
});
after(async () => {
  await browser.close();
});

beforeEach(async() => {
  page = await browser.newPage();
});
afterEach(async () => {
  await page.close();
});

describe('test title', function() {
  it('when main page', async () => {
    await page.goto('https://duckduckgo.com');
    assert.equal(await page.title(), 'DuckDuckGo — Privacy, simplified.');
  });

  it('when result page', async () => {
    await page.goto('https://duckduckgo.com/?q=test');
    assert.equal(await page.title(), 'test at DuckDuckGo');
  });
});
