const express = require('express');
const { chromium } = require('playwright');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => res.send('ok'));

app.get('/screenshot', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing url query parameter');

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 });
    const buffer = await page.screenshot({ fullPage: true, type: 'png' });
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).send('Failed: ' + String(err.message || err));
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
