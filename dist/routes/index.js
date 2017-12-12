'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _welcome = require('./welcome');

var _welcome2 = _interopRequireDefault(_welcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = [_welcome2.default];

exports.default = function (router) {
  return controllers.forEach(function (f) {
    return f(router);
  });
};