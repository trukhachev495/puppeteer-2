const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Ticket booking", () => {
test("Reservation of one place", async () => {
      await clickElement(page, '.page-nav__day:nth-child(4)');
      await clickElement(page, '[data-seance-start="660"]');
      await clickElement(page, '.buying-scheme__row:nth-child(1) .buying-scheme__chair:nth-child(3)');
      const isButtonDisabled = await page.$eval(".acceptin-button", (button) => button.hasAttribute("disabled"));
      const actual = await getText(page, ".acceptin-button");
      await expect(actual).toContain("Забронировать");
      await expect(isButtonDisabled).toBe(false);
  });
    test("Reservation of two place", async () => {
      await clickElement(page, '.page-nav__day:nth-child(4)');
      await clickElement(page, '[data-seance-start="660"]');
      await clickElement(page, '.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(5)');
      await clickElement(page, '.buying-scheme__row:nth-child(9) .buying-scheme__chair:nth-child(9)');
      const isButtonDisabled = await page.$eval(".acceptin-button", (button) => button.hasAttribute("disabled"));
      const actual = await getText(page, ".acceptin-button");
      await expect(actual).toContain("Забронировать");
      await expect(isButtonDisabled).toBe(false);
    });
    test("Reservation of a occupied seat", async () => {
      await clickElement(page, '.page-nav__day:nth-child(4)');
      await clickElement(page, '[data-seance-start="660"]');
      await clickElement(page, '.buying-scheme__row:nth-child(6) .buying-scheme__chair:nth-child(3)');
      const isButtonDisabled = await page.$eval(".acceptin-button", (button) => button.hasAttribute("disabled"));
      const actual = await getText(page, ".acceptin-button");
      await expect(actual).toContain("Забронировать");
      await expect(isButtonDisabled).toBe(true);
  });
});

