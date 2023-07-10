import express from "express";
import cheerio from "cheerio";
import puppeteer from "puppeteer";
const router = express.Router();

router.get("/", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.pinterest.co.kr/search/pins/?q=%EA%B2%A8%EC%9A%B8%EC%BD%94%EB%94%94&rs=typed"
    );
    const imgNode =
      "#mweb-unauth-container > div > div.zI7.iyn.Hsu > div.F6l.ZZS.k1A.zI7.iyn.Hsu > div > div > div > div:nth-child(1) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > a > div > div > div > div > div.XiG.zI7.iyn.Hsu > img";
    await page.waitForSelector(imgNode);

    const content = await page.content();
    const $ = cheerio.load(content);
    const elements = $("img");
    const arr = elements
      .map((idx, el) => {
        return $(el).attr("src");
      })
      .toArray();

    res.send(arr);
    await browser.close();
  })();
});

export default router;
