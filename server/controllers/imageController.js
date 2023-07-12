import express from "express";
import cheerio from "cheerio";
import puppeteer from "puppeteer";

export const getImage = (req, res) => {
  {
    (async () => {
      // 월 정보
      const month = new Date().getMonth() + 1;
      const browser = await puppeteer.launch({
        headless: "new",
      });
      const page = await browser.newPage();

      let searchArr = [];

      if (month >= 3 && month <= 5) {
        searchArr = ["봄옷", "봄코디", "봄패션", "봄남자코디"];
      } else if (month >= 6 && month <= 8) {
        searchArr = ["여름옷", "여름코디", "여름패션", "여름남자옷"];
      } else if (month >= 9 && month <= 11) {
        searchArr = ["가을옷", "가을코디", "가을패션", "가을남자코디"];
      } else if (month === 12 && month <= 2) {
        searchArr = ["겨울옷", "겨울코디", "겨울패션", "겨울남자코디"];
      }

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
