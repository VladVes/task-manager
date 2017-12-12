'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('root', '/', function (ctx) {
    ctx.body = 'Welcome to the JavaScript Jungle.\n Never never never give up!';
  });
};