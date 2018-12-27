import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

enableProdMode();

global['localStorage'] = null;
global['sessionStorage'] = null;

const PORT = process.env.PORT || 44301;
const DIST_FOLDER = join(process.cwd(), 'dist');

const LOCALES = [
  {
    id: 'en',
    engine: ngExpressEngine({
      bootstrap: require('main.server.en').AppServerModuleNgFactory,
      providers: [provideModuleMap(require('main.server.en').LAZY_MODULE_MAP)]
    })
  },
  {
    id: 'de',
    engine: ngExpressEngine({
      bootstrap: require('main.server.de').AppServerModuleNgFactory,
      providers: [provideModuleMap(require('main.server.de').LAZY_MODULE_MAP)]
    })
  }
];

const app: any = express();

// HTML engine using a wrapper to get the correct ngExpressEngine by locale id
app.engine('html', (filePath, options, callback) => {
  options.engine(filePath, { req: options.req, res: options.res }, callback);
});

app.set('view engine', 'html');

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Locale endpoints
LOCALES.forEach(locale => {
  app.get(`/${locale.id}(/*)?`, (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', locale.id, 'index.html'), { req, res, engine: locale.engine });
  });
});

// Redirect to default locale keeping requested path
app.get('*', (req, res) => {
  res.redirect(`/en${req.url}`.replace(/\/+/g, '/'));
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
