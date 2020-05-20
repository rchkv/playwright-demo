const { webkit, devices } = require('playwright');
const iPhone11 = devices['iPhone 11 Pro'];
const expect = require('chai').expect;

let browser;
let page;

before(async () => {
  browser = await webkit.launch();
  context = await browser.newContext({
    ...iPhone11,
    geolocation: { longitude: 60.574802, latitude: 56.832554 },
    permissions: ['geolocation']
  });
});

after(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await context.newPage();
});

afterEach(async () => {
  await page.close();
});

describe('test permissions', function () {
  it('is geolocation', async () => {
    await page.goto('https://yandex.ru/maps');
    await page.click('.interstitial-view__links-web');
    await page.screenshot({ path: 'artifacts/map.png' });
    const sidebarTitle = await page.$eval('.config-view', e => e.textContent);
    expect(sidebarTitle).to.have.string('Екатеринбург');
  });
});
