const koa = require('koa');
const app = koa();
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { App } = require('./src/components/app/app');
const hbs = require('koa-hbs');
const common = require('koa-common');

const csp = [
  'default-src \'none\'',
  'script-src \'self\'',
  'connect-src \'self\'',
  'img-src \'self\'',
  'style-src \'self\''
];

app.use(function *(next) {
  this.set('Content-Security-Policy', csp.join(';'));
  yield next;
});

app.use(common.static('./dist'));

app.use(hbs.middleware({
  viewPath: './src/views'
}));

app.use(function *() {
  const html = renderToString(createElement(App));
  yield this.render('app', {
    mainPlaceholder: html
  });
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
