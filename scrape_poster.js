const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let menuData = null;
  
  page.on('response', async response => {
    try {
      if (response.url().includes('joinposter.com')) {
        const text = await response.text();
        if (text.includes('products') || text.includes('category_name')) {
          const fs = require('fs');
          fs.writeFileSync('/Users/sashasitnickyi/dev/bali/poster_qr_menu.json', text);
          console.log("Found menu data in URL:", response.url());
        }
      }
    } catch (e) {}
  });

  await page.goto('https://menu.ps.me/LKsvaUm_mXk', { waitUntil: 'networkidle' });
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
