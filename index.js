const koa = require('koa');
const router = require('koa-router')();
const app = koa();
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { App } = require('./src/components/app/app');
const hbs = require('koa-hbs');
const common = require('koa-common');
const HW_VIEW = 'hello-world';
const html = renderToString(createElement(App));
const HW_OPTIONS = {
  mainPlaceholder: html
};

app.use(common.static('./dist'));

app.use(common.favicon(__dirname + '/public/favicon.ico'));

app.use(hbs.middleware({
  viewPath: './src/views'
}));

const cspNuclear = [
  'default-src \'none\'',
  'script-src \'self\'',
  'connect-src \'self\'',
  'img-src \'self\'',
  'style-src \'self\''
];

const cspScript = [
  'default-src \'none\'',
  'script-src \'self\' \'unsafe-eval\'',
  'connect-src \'self\'',
  'img-src \'self\'',
  'style-src \'self\''
];

router.get('/', function *() {
  yield this.render('app');
});

router.get('/nuclear', function *() {
  this.set('Content-Security-Policy', cspNuclear.join(';'));

  yield this.render(HW_VIEW, HW_OPTIONS);
});

router.get('/evil', function *() {
  yield this.render(HW_VIEW, HW_OPTIONS);
});

router.get('/read-the-script', function *() {
  this.set('Content-Security-Policy', cspScript.join(';'));

  yield this.render(HW_VIEW, HW_OPTIONS);
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('listening on 3000');
});
