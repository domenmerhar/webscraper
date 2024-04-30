const puppeteer = require("puppeteer");

async function getAnchors(
  page: any,
  selector: string,
  callback: (element: HTMLAnchorElement) => string
) {
  const elements: string[] = await page.evaluate(
    (selector: string, callback: (element: HTMLAnchorElement) => string) => {
      return Array.from(
        document.querySelectorAll(selector) as NodeListOf<HTMLAnchorElement>,
        (element: HTMLAnchorElement) => element.href
      );
    },
    selector,
    callback
  );

  return elements;
}

function getHref(element: HTMLAnchorElement): string {
  return element.href;
}

const HUMBLE_BUNDLE_URL = "https://www.humblebundle.com/games";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to the provided URL
  await page.goto(HUMBLE_BUNDLE_URL);

  const anchorTags = await getAnchors(page, ".mosaic-section a", getHref);

  console.log(anchorTags);

  // Close the browser
  await browser.close();
})();
