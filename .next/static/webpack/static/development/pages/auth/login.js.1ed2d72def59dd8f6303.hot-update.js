webpackHotUpdate("static/development/pages/auth/login.js",{

/***/ "./api/_base.js":
/*!**********************!*\
  !*** ./api/_base.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);



axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.baseURL = "https://test.echoexchange.net/"; // 'https://test.echoexchange.net/'

axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.validateStatus = function (status) {
  return status < 400;
};

axios__WEBPACK_IMPORTED_MODULE_1___default.a.interceptors.request.use(function (config) {
  // Do something before request is sent
  var accessToken = js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get('accessToken');
  if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken;
  return config;
}, function (error) {
  // Do something with request error
  return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.reject(error);
});
axios__WEBPACK_IMPORTED_MODULE_1___default.a.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Do something with response error
  var errData = error && error.response && error.response.data;
  return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.reject(errData || error);
});
/* harmony default export */ __webpack_exports__["default"] = (axios__WEBPACK_IMPORTED_MODULE_1___default.a);

/***/ })

})
//# sourceMappingURL=login.js.1ed2d72def59dd8f6303.hot-update.js.map