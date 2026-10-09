// Static server for the MiniShop web app (shop.html + shop.js) on port 4000.
// Playwright starts it automatically (see playwright.config.ts → webServer).
const express = require('express');
const path = require('path');
const app = express();
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'shop.html')));
app.get('/shop.js', (req, res) => res.sendFile(path.join(__dirname, 'shop.js')));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`MiniShop listening on http://localhost:${port}`));
