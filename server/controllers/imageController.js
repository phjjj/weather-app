import express from "express";
import cheerio from "cheerio";
import puppeteer from "puppeteer";

export const getImage = (req, res) => {
  {
    (async () => {
      console.log(req.query);
      const browser = await puppeteer.launch({
        headless: "new",
      });
      const page = await browser.newPage();

      //검색어
      const searchArr = ["겨울옷", "겨울코디", "겨울패션", "겨울남자코디"];

      //랜덤함수
      const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      await page.goto(
        `https://www.pinterest.co.kr/search/pins/?q=${
          searchArr[rand(0, searchArr.length - 1)]
        }`
      );

      await page.waitForSelector(
        "#mweb-unauth-container > div > div.zI7.iyn.Hsu > div.F6l.ZZS.k1A.zI7.iyn.Hsu > div > div > div > div:nth-child(1)"
      );

      const content = await page.content();
      const $ = cheerio.load(content);
      const elements = $("img[loading]");
      const imageArr = elements
        .map((idx, el) => {
          return $(el).attr("src");
        })
        .toArray();

      res.send(imageArr);
      await browser.close();
    })();
  }
};
