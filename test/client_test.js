const { I } = inject();
const waitForAction = 5;
const { time } = require('console');
const fs = require('fs');
const path = require('path');
const isIOS = process.env.PLATFORM === 'ios';

const folderPath = 'output';

Feature('Client test');

Scenario('Open cathaybk homepage', ({ I }) => {
  I.amOnPage('https://www.cathaybk.com.tw/cathaybk/');
  I.waitForElement({ css: 'div.cubre-o-indexKv__title > h1' }, waitForAction);
  I.saveScreenshot('cathaybk_homepage.png');
}).retry(2);

Scenario('Credit card item count', async ({ I }) => {
  I.amOnPage('https://www.cathaybk.com.tw/cathaybk/');
  I.click('a.cubre-a-burger');
  I.click('div.cubre-o-nav__menu > div > div:nth-child(1) > div.cubre-o-menu__btn > div');
  I.click('div.cubre-o-menu__item.is-L1open > div.cubre-o-menu__content > div > div:nth-child(1) > div.cubre-o-menuLinkList__btn > div');
  let numOfCreditCardItem = await I.executeScript(async () => {
    const elements = document.querySelectorAll('div.cubre-o-menuLinkList__item.is-L2open > div.cubre-o-menuLinkList__content > a')
    return elements.length;
  });
  console.log(`共有${numOfCreditCardItem}個項目在信用卡選單下方`);
  I.saveScreenshot('credit_card_item_count.png');
}).retry(2);

Scenario('Stop credit card count', async ({ I }) => {
  I.amOnPage('https://www.cathaybk.com.tw/cathaybk/');
  I.click('a.cubre-a-burger');
  I.click('div.cubre-o-nav__menu > div > div:nth-child(1) > div.cubre-o-menu__btn > div');
  I.click('div.cubre-o-menu__item.is-L1open > div.cubre-o-menu__content > div > div:nth-child(1) > div.cubre-o-menuLinkList__btn > div');
  I.click('卡片介紹');
  I.waitForElement({ css: 'div.cubre-m-anchor__nav' }, waitForAction);
  I.click('百貨購物');
  I.click('整併卡');
  I.waitForElement({ css: "section:nth-child(6) > div > div.cubre-o-block__component > div > div.cubre-o-slide__page" }, waitForAction);
  let numOfStopped, numOfStop = 0;
  if (isIOS) {
    numOfStopped = await I.grabNumberOfVisibleElements('section:nth-child(6) > div > div.cubre-o-block__component > div > div.cubre-o-slide__page > span');
    for (let i = 1; i <= numOfStopped; i++) {
      await I.saveScreenshot(`stop_credit_card_${i}.png`);
      await I.performSwipe({ x: 340, y: 515 }, { x: 40, y: 515 });
    };
  }
  else {
    numOfStopped = await I.executeScript(async () => {
      const elements = document.querySelectorAll('section:nth-child(6) > div > div.cubre-o-block__component > div > div.cubre-o-slide__page > span')
      return elements.length;
    });
    for (let i = 1; i <= numOfStopped; i++) {
      await I.saveScreenshot(`stop_credit_card_${i}.png`);
      await I.performSwipe({ x: 340, y: 515 }, { x: 40, y: 515 });
    };
  }
  I.click('停發卡');
  if (isIOS) {
    numOfStop = await I.grabNumberOfVisibleElements('section:nth-child(7) > div > div.cubre-o-block__component > div > div.cubre-o-slide__page > span');
    for (let i = 1; i <= numOfStop; i++) {
      await I.saveScreenshot(`stopped_credit_card_${i}.png`);
      await I.performSwipe({ x: 340, y: 515 }, { x: 40, y: 515 });
    };
  }
  else {
    numOfStop = await I.executeScript(async () => {
      const elements = document.querySelectorAll('section:nth-child(7) > div > div.cubre-o-block__component > div > div.cubre-o-slide__page > span')
      return elements.length;
    });
    for (let i = 1; i <= numOfStop; i++) {
      await I.saveScreenshot(`stopped_credit_card_${i}.png`);
      await I.performSwipe({ x: 340, y: 515 }, { x: 40, y: 515 });
    };
  }

  const total = numOfStopped + numOfStop;
  const files = getFilesWithPrefixAndExtension();
  const filesLength = (await files).length;
  if (total === filesLength) {
    console.log('比對計算(停發)信用卡數量與截圖數量結果為相同');
  }
  else {
    console.log('比對計算(停發)信用卡數量與截圖數量結果為不相同');
  }
}).retry(2);

async function getFilesWithPrefixAndExtension() {
  const files = fs.readdirSync(folderPath);

  const filteredFiles = files.filter(file =>
    file.startsWith('stop') && path.extname(file) === '.png'
  );

  console.log(`Number of files: ${filteredFiles.length}`);

  return filteredFiles;
}