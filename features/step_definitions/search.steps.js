const puppeteer = require('puppeteer')
const chai = require('chai')
const expect = chai.expect
const { clickElement, getText } = require('../../lib/commands.js')
const { Given, When, Then, Before, After } = require('cucumber')

let browser, page

Before(async function () {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  page = await browser.newPage()
  await page.setDefaultNavigationTimeout(10000)
})

After(async function () {
  if (browser) {
    await browser.close()
  }
})

Given('the user is on the page with URL {string}', async url => {
  await page.goto(url)
})

Given('the user selects a date with time stamp {int}', async (timeStamp) => {
  await clickElement(page, `.page-nav__day:nth-child(${timeStamp})`);
});

Given(
  'the user selects a seance start time {string}',
  async seanceStartTime => {
    await clickElement(page, `[data-seance-start="${seanceStartTime}"]`)
  }
)

When(
  'the user clicks on the seat in the {int} row and {int} chair',
  async (row, chair) => {
    const selector = `.buying-scheme__row:nth-child(${row}) .buying-scheme__chair:nth-child(${chair})`
    await clickElement(page, selector)
  }
)

When(
  'the user clicks on another seat in the {int} row and {int} chair',
  async (row, chair) => {
    const selector = `.buying-scheme__row:nth-child(${row}) .buying-scheme__chair:nth-child(${chair})`
    await clickElement(page, selector)
  }
)

Then(
  'the reservation button should be active with label {string}',
  async expectedLabel => {
    const isButtonDisabled = await page.$eval('.acceptin-button', button =>
      button.hasAttribute('disabled')
    );
    const actualLabel = await getText(page, '.acceptin-button');

    expect(actualLabel).to.contain(expectedLabel);
    expect(isButtonDisabled).to.be.false;
  }
);
Then(
  'the reservation button should be inactive {string}',
  async expectedLabel => {
    const isButtonDisabled = await page.$eval('.acceptin-button', button =>
      button.hasAttribute('disabled')
    );
    const actualLabel = await getText(page, '.acceptin-button');

    expect(actualLabel).to.contain(expectedLabel);
    expect(isButtonDisabled).to.be.true;
  }
);




// Given("user is on {string} page", async function (string) {
//   return await this.page.goto(`https://netology.ru${string}`, {
//     setTimeout: 20000,
//   });
// });

// When("user search by {string}", async function (string) {
//   return await putText(this.page, "input", string);
// });

// Then("user sees the course suggested {string}", async function (string) {
//   const actual = await getText(this.page, "a[data-name]");
//   const expected = await string;
//   expect(actual).contains(expected);
// });
