'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var app = new _koa2.default();

  var router = new _koaRouter2.default();
  router.get('root', '/', function (ctx) {
    ctx.body = 'Welcome to the JavaScript Jungle.\n Never never never give up!';
    console.log('From root route!');
  });
  //app.use((ctx) => {
  //    console.log('FIRST MIDDLWARE');
  //});
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
};