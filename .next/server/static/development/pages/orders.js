module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/images/nav/Logo.png":
/*!************************************!*\
  !*** ./assets/images/nav/Logo.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABCCAYAAAA476rKAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAACQ5JREFUeJztnD1yGssWx3/tuiFVj4CceQE3MIHRCjxagaUVWEpMaGkFklYgK+QlQisQXoFGKzAOuIEJ3pBT9XhV5H2DPq1php6hBwFCvvpXUdJ8dZ/5z+nz1TOttNaEQCkVdN6m0eqN6sAR8BGIgFgOpfJ7BAbjbnu4e+kglD8AtY9kt3qjDobUz0An8LIZMAC+A8m4255tR7pFvEqyW73REfAJQ3JUcuoQQ2wHqJecl2CIH4y77XQTMvrwKshu9UYRmXk4Kjk1xWjs47jbHnjaiDEPaa02nou9JbvVG8Vk2ltmHhLW0EoZHfbhRQWnzZz2k+dq/d6QnXNuRxQP+43bW8fu24dbhCGG/Lt1nOyLkl3BuQ3JtHerkcQaD91GOCsf+k7JlhuJWe3c3OEbdCPbgijEZ8LNWVKkEFsnew3n9n3cbSfBUu0Qz3WyWyW71RudALclp7rDMA2WZE8Q6GSHwPG42063RnYB0SmLw+3FzMOmscLJpsDBry/vg++3UojR6o3+R+ZcBsDVrtNkIeDad2zcbR9usV/rZK/JODgfd9vfQtv4o0JnsdPJYNxtH4deu2FYh7xTyIjtt3qjIfBDdn8Cgsl+t2bfP9e87tXjOSN5XbLfsAbeyN4h3sjeIYIdpCQlLzODsGcYd9tr8fCm2TtEsGZvE5IyRyxOCCTA7DneX2LjDpDuQzYbTLbWOmKx0DQDEqXUWmQIEWeYglDkOeVCzpthUuOkQtsnwFecIpO0YxOxdB2ZhYOILM6fAUOlVJBsK8nWWp9gbjwqOJ4CN0qp4OC+1RudSZtl01oWdcxNhbRbB+7xJz114AQ4avVG5+Nuux/SptbaXveVYg4A+hgeCpWv0NBLJ0WC+5AAx0qpUmJavdEtRvhguA5JMtmHglOHhE0Qz4DDVSZKa93BcBAFCWpwpZS69B3wOkgh+oFqaXFMeTWQVm90TUWiMQ8xFKEz8XUK6isWWusYw0FUoX+AC621l4eiaOSeZcEHwIESAMcYTXJxpLX21oRFI89KhBwCV8Ch/M4xdYfvJdcUIUUcbMk5sTjmJYhtvmfZzM0w5uLYkTH1NHGitV661yWbLTY6zu3uK6VO3R1KqYHWOsEUZVyhrzEPJo8Lzz4LX/UsKTm/CDPg1Bb3xYaXjaYYQ14ebmXPIsWYSVfBEq11v6CPC6113zWrPs3+mu8kT7SFNHSV2x2JrXuCMxviQ6Uy5Qqcu7MoUqk7p1jDP+R3iFb7RmeeaOCJA5+GW8f6hAWyhaS8+bgpENTCp8VxbrtouindINH4IgwhvOhdEZ+N98naL40y/EoHJqx9Qt6MxL7GxFlUQV5jljRIkFRsd11MKpz7ybMvxG8MWA4QFh5mnuymp5FSr12AaMW2RRUSdoXIs29l4qaUmknOsXC91rpjR0XeZoeGTr8zovwOpVQaeK3vvCdHu6tCVLCD+p2RNyM+Us4JGEY5pLntn/gdT9zqjep7NiM/Ixf2aa3rqzJjQeTZl9p/8mT7SJmFFlpKUPSwbBzsDS1fCEOWA4WY4ogGeMq6o/x+1wTlzYiPlM+efZUgsW+RZpy0eqNrSUD2AT4OfBFKHr6Rm7gbC5otWWF+GMVa63gD2n1DcRZ5hiF9wGKE8gGob/N9EA/uWC4rnGitCyt6otW+e7tzN3wO0pfE3BfVPHKdRiWHv+H31hY247pwfkfsOEISQhPPoVvf/QnRtyybkKVkyke2j5Q6hvAfWutLrXXs/M5k3wPwX+l8CeIEjwmsTbt9v4CJ8aX4HeCH1vraufcTTG3Ip4ineae6VIiS4PwYU17M36RN58uKSh0KMsNxtz1s9UaHGE2oorGFbW4DSqmh1vqc5YzQzi6VVS8BvimllhyqN86WoXRI9ZAPVtTAx932cNxtH2AikJD20zVkeDaUUn2MjFVG4gyj0efeNlddLUNlYT6vACnyuUQVZ+pM9sa5Qwl7MFErZvGasC8WrsqyzeD3H6RTa0Zsp6n9VUhpXy2kIOfe/4wKE75veMPvCTWZzjtkZdQhpnZ70WzUDgEm0/kZWQZlC+T3GPNx02zU+pPp/Ej2HTcbtcFkOtfNRm3BRE2m82uMXU6RBKfZqB1OpvNLOeUj2WsLV5hoyL4Dfo9x2LFs29rxTGQYTKbzHwDNRu1gMp3H7j1I/5eYbDiV9m+lTduP/aDJK1+zUbv09PHgkSvP5b38f/eHdHrabNSGIpS9kMl0HgFfm43av+X/B4yHTqUhW7X7hJnL+4inhiAPI2o2agdOH3X52yTLGu/IIpRE2vXNtORljuS8aDKdl8XkidOHfaAJxkGXylfQR4oJgx8L5IrJHm76Dug0G7XhZDq/nkzn+Q9sIjmZZqOWkmVJdeBfznYsghRlmR2WX6Cvs/wp3wcyLXmU6yK51iWxY2/I6Z8VMkAW9dTJSLb9rJLP10cqv4+uXDkun9p5B/Qn0/kti1M/deepRJPp/EiGU9/p8BGIxQzN5PqZbDOZzu0x5Lqv0o4VOm02apdkWoHccJK7MRvnuqFnfzKd30ofEWYEfMdorTV5dee4RUr2isM1JlO8wIycVfL5+gCjtfYaH5cz6TN912zUTqXBmEUTEWOe6oH8TeVce7wjx+rAebNRS6TjuiNAB55GxQFZ6JiSFWkSsuFttcDuu8LYz8T95WSuAz+bjdo3zEP96bkH28/E2WevsX5olXy+Pu7k3k49ci1xGfxp3huej7f3s3eI4FeG//zPXzaDhD1Io18S8iodwOzXl/fB9aMqmt3BhEoPLL819Y+BlHstD5Ve86hCdur8fyJf2v4T4RKcVrmw6rfr9yzGsQk7WIfppVGyftXhry/vk9B2qpJth5BPq1O2tA7TrhG4xMfpuNvub3sJDDtbUfQtDGx4HaZdoML6VQPgxn7js7OVdHa1DtM2sKn1q15kjahtrsO0KWxj/aq9WP1sk+swrYtdrF+1F2S72OVih7tev2rvyM4jcB0mWLSVaUl7MdmDXNXeRtev2nuyXazhZP9P9r2jrX8X+YeULa9f9arIdpGzsWVOtgzBzm0TeLVk5yFab7O3Iie7tnPbBH4bsl04KyzUMXZ5yDNXbdgEqpD9NxAAyGPb1g5DAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-server/head */ "next-server/head");
/* harmony import */ var next_server_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_server_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_images_nav_Logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/assets/images/nav/Logo.png */ "./assets/images/nav/Logo.png");
/* harmony import */ var _assets_images_nav_Logo_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_images_nav_Logo_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ "./node_modules/semantic-ui-css/semantic.min.css");
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_base_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/styles/base.scss */ "./styles/base.scss");
/* harmony import */ var _styles_base_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_base_scss__WEBPACK_IMPORTED_MODULE_7__);








var MenuLink = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(function (_ref) {
  var pathname = _ref.router.pathname,
      to = _ref.to,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    prefetch: true,
    href: to
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Menu"].Item, {
    as: "a",
    active: pathname === to
  }, children));
});

var Layout = function Layout(_ref2) {
  var children = _ref2.children,
      _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? "Echo exchange" : _ref2$title;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Container"], {
    style: {
      paddingTop: 40
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_server_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "Echo exchange / ", title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    charSet: "utf-8"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "viewport",
    content: "initial-scale=1.0, width=device-width"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Menu"], {
    fixed: "top",
    inverted: true,
    size: "large",
    borderless: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Container"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Image"], {
    src: _assets_images_nav_Logo_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    style: {
      padding: '4px 10px 4px 0',
      height: '47px'
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuLink, {
    to: "/dashboard"
  }, "Dashboard"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuLink, {
    to: "/inventory"
  }, "Inventory"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuLink, {
    to: "/orders/sales"
  }, "Orders"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuLink, {
    to: "/settings"
  }, "Settings"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Menu"].Menu, {
    position: "right"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuLink, {
    to: "/auth/logout"
  }, "Logout")))), children);
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Layout));

/***/ }),

/***/ "./hocs/defaultPage.js":
/*!*****************************!*\
  !*** ./hocs/defaultPage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ~/utils/auth */ "./utils/auth.js");









 // import { getUserFromServerCookie, getUserFromLocalCookie } from '~/utils/auth'


/* harmony default export */ __webpack_exports__["default"] = (function (Page) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(DefaultPage, _React$Component);

      function DefaultPage() {
        var _getPrototypeOf2;

        var _this;

        Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, DefaultPage);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(DefaultPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

        Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "logout", function (eve) {
          if (eve.key === 'logout') {
            next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push("/auth/logout");
          }
        });

        return _this;
      }

      Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(DefaultPage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          window.addEventListener('storage', this.logout, false);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          window.removeEventListener('storage', this.logout, false);
        }
      }, {
        key: "render",
        value: function render() {
          return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Page, this.props);
        }
      }], [{
        key: "getInitialProps",
        value: function getInitialProps(ctx) {
          var token =  false ? undefined : Object(_utils_auth__WEBPACK_IMPORTED_MODULE_10__["getTokenFromServerCookie"])(ctx.req);
          var pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
          return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, pageProps, {
            // loggedUser,
            currentUrl: ctx.pathname,
            isAuthenticated: !!token
          });
        }
      }]);

      return DefaultPage;
    }(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component)
  );
});

/***/ }),

/***/ "./hocs/securePage.js":
/*!****************************!*\
  !*** ./hocs/securePage.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _defaultPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./defaultPage */ "./hocs/defaultPage.js");











var securePageHoc = function securePageHoc(Page) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(SecurePage, _React$Component);

    function SecurePage() {
      Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SecurePage);

      return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(SecurePage).apply(this, arguments));
    }

    Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SecurePage, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.props.isAuthenticated) next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push('/login/logout');
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.props.isAuthenticated) {
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Not authorized");
        }

        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Page, this.props);
      }
    }], [{
      key: "getInitialProps",
      value: function getInitialProps(ctx) {
        return Page.getInitialProps && Page.getInitialProps(ctx);
      }
    }]);

    return SecurePage;
  }(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_class, "propTypes", {
    isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool.isRequired
  }), _temp;
};

/* harmony default export */ __webpack_exports__["default"] = (function (Page) {
  return Object(_defaultPage__WEBPACK_IMPORTED_MODULE_9__["default"])(securePageHoc(Page));
});

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/array/from.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/array/from.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/array/from */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/from.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/array/is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/is-array.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/date/now.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/date/now.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/date/now */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/date/now.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/get-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/get-iterator.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/is-iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/is-iterable.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/number/is-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/number/is-integer.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/assign */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/assign.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/create.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/entries.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/entries */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/entries.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-descriptor.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-symbols.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/keys.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-float.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/parse-float */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-float.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/parse-int */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-int.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/promise.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/promise.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/promise */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/promise.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/reflect/construct */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/reflect/construct.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/construct.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/construct.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Reflect$construct = __webpack_require__(/*! ../core-js/reflect/construct */ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_Reflect$construct) return false;
  if (_Reflect$construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(_Reflect$construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = _Reflect$construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/createClass.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithHoles; });
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__);

function _arrayWithHoles(arr) {
  if (_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default()(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithoutHoles; });
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__);

function _arrayWithoutHoles(arr) {
  if (_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default()(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getPrototypeOf; });
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);


function _getPrototypeOf(o) {
  _getPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a ? _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a : function _getPrototypeOf(o) {
    return o.__proto__ || _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inherits; });
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js");


function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArray; });
/* harmony import */ var _core_js_array_from__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/from */ "./node_modules/@babel/runtime-corejs2/core-js/array/from.js");
/* harmony import */ var _core_js_array_from__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_from__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/is-iterable */ "./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js");
/* harmony import */ var _core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1__);


function _iterableToArray(iter) {
  if (_core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1___default()(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return _core_js_array_from__WEBPACK_IMPORTED_MODULE_0___default()(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArrayLimit; });
/* harmony import */ var _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/get-iterator */ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js");
/* harmony import */ var _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableRest; });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableSpread; });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectSpread; });
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(source);

    if (typeof _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a === 'function') {
      ownKeys = ownKeys.concat(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(source).filter(function (sym) {
        return _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__);

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _slicedToArray; });
/* harmony import */ var _arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _nonIterableRest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js");



function _slicedToArray(arr, i) {
  return Object(_arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || Object(_nonIterableRest__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toConsumableArray; });
/* harmony import */ var _arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js");
/* harmony import */ var _nonIterableSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js");



function _toConsumableArray(arr) {
  return Object(_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || Object(_nonIterableSpread__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typeof; });
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);



function _typeof2(obj) { if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && typeof _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && _typeof2(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(/*! ../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/inherits.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$create = __webpack_require__(/*! ../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/typeof.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");

var _Symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/from.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Array.from;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/is-array.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/is-array.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.array.is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.is-array.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Array.isArray;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/date/now.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/date/now.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.date.now */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.date.now.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Date.now;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/get-iterator.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/get-iterator.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/is-iterable.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/is-iterable.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.is-iterable.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/number/is-integer.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/number/is-integer.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.number.is-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.number.is-integer.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Number.isInteger;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/entries.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/entries.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.entries */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.object.entries.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.entries;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-descriptor.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-symbols.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-symbols.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/keys.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/keys.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.keys.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.keys;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-float.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-float.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-float */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-float.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").parseFloat;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-int.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-int.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-int */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-int.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").parseInt;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/promise.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/promise.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.promise.js");
__webpack_require__(/*! ../modules/es7.promise.finally */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.finally.js");
__webpack_require__(/*! ../modules/es7.promise.try */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Promise;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/reflect/construct.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/reflect/construct.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.reflect.construct */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.reflect.construct.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Reflect.construct;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__(/*! ../../modules/es6.object.to-string */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es7.symbol.observable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-instance.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-instance.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_bind.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_bind.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_create-property.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_for-of.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_for-of.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-integer.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-integer.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_microtask.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_microtask.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-to-array.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-to-array.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-float.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-float.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js").trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js") + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-int.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-int.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js").trim;
var ws = __webpack_require__(/*! ./_string-ws */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine-all.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine-all.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-species.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-species.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var spaces = __webpack_require__(/*! ./_string-ws */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_user-agent.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_user-agent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var get = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.is-iterable.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.is-iterable.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.from.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.is-array.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.is-array.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.date.now.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.date.now.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.number.is-integer.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.number.is-integer.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-integer.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.keys.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.keys.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-float.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-float.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-float.js");
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-int.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-int.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-int.js");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.promise.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.promise.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.reflect.construct.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.reflect.construct.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var bind = __webpack_require__(/*! ./_bind */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_bind.js");
var rConstruct = (__webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.object.entries.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.object.entries.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var $entries = __webpack_require__(/*! ./_object-to-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.finally.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.finally.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.try.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.try.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __NEXT_DATA__ */

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _stringify = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var url_1 = __webpack_require__(/*! url */ "url");

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var router_1 = __importStar(__webpack_require__(/*! next/router */ "./node_modules/next/router.js"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

function isLocal(href) {
  var url = url_1.parse(href, false, true);
  var origin = url_1.parse(utils_1.getLocationOrigin(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatUrl) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return function (href, as) {
    if (href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatUrl(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

var Link =
/*#__PURE__*/
function (_react_1$Component) {
  (0, _inherits2.default)(Link, _react_1$Component);

  function Link() {
    var _this;

    (0, _classCallCheck2.default)(this, Link);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Link).apply(this, arguments)); // The function is memoized so that no extra lifecycles are needed
    // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    _this.formatUrls = memoizedFormatUrl(function (href, asHref) {
      return {
        href: href && (0, _typeof2.default)(href) === 'object' ? utils_1.formatWithValidation(href) : href,
        as: asHref && (0, _typeof2.default)(asHref) === 'object' ? utils_1.formatWithValidation(asHref) : asHref
      };
    });

    _this.linkClicked = function (e) {
      var _e$currentTarget = e.currentTarget,
          nodeName = _e$currentTarget.nodeName,
          target = _e$currentTarget.target;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var _this$formatUrls = _this.formatUrls(_this.props.href, _this.props.as),
          href = _this$formatUrls.href,
          as = _this$formatUrls.as;

      if (!isLocal(href)) {
        // ignore click if it's outside our scope
        return;
      }

      var pathname = window.location.pathname;
      href = url_1.resolve(pathname, href);
      as = as ? url_1.resolve(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var scroll = _this.props.scroll;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      router_1.default[_this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: _this.props.shallow
      }).then(function (success) {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      }).catch(function (err) {
        if (_this.props.onError) _this.props.onError(err);
      });
    };

    return _this;
  }

  (0, _createClass2.default)(Link, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.prefetch();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if ((0, _stringify.default)(this.props.href) !== (0, _stringify.default)(prevProps.href)) {
        this.prefetch();
      }
    }
  }, {
    key: "prefetch",
    value: function prefetch() {
      if (!this.props.prefetch) return;
      if (typeof window === 'undefined') return; // Prefetch the JSON page if asked (only in the client)

      var pathname = window.location.pathname;

      var _this$formatUrls2 = this.formatUrls(this.props.href, this.props.as),
          parsedHref = _this$formatUrls2.href;

      var href = url_1.resolve(pathname, parsedHref);
      router_1.default.prefetch(href);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = this.props.children;

      var _this$formatUrls3 = this.formatUrls(this.props.href, this.props.as),
          href = _this$formatUrls3.href,
          as = _this$formatUrls3.as; // Deprecated. Warning shown by propType check. If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag


      if (typeof children === 'string') {
        children = react_1.default.createElement("a", null, children);
      } // This will return the first child, if multiple are provided it will throw an error


      var child = react_1.Children.only(children);
      var props = {
        onClick: function onClick(e) {
          if (child.props && typeof child.props.onClick === 'function') {
            child.props.onClick(e);
          }

          if (!e.defaultPrevented) {
            _this2.linkClicked(e);
          }
        }
      }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
      // defined, we specify the current 'href', so that repetition is not needed by the user

      if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
        props.href = as || href;
      } // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly.


      if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
        props.href = router_1.Router._rewriteUrlForNextExport(props.href);
      }

      return react_1.default.cloneElement(child, props);
    }
  }]);
  return Link;
}(react_1.Component);

if (true) {
  var warn = utils_1.execOnce(console.error); // This module gets removed by webpack.IgnorePlugin

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact");

  Link.propTypes = exact({
    href: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]).isRequired,
    as: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]),
    prefetch: prop_types_1.default.bool,
    replace: prop_types_1.default.bool,
    shallow: prop_types_1.default.bool,
    passHref: prop_types_1.default.bool,
    scroll: prop_types_1.default.bool,
    children: prop_types_1.default.oneOfType([prop_types_1.default.element, function (props, propName) {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

exports.default = Link;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js"));

var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/construct */ "./node_modules/@babel/runtime-corejs2/helpers/construct.js"));

var _defineProperty = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js"));

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */

var router_1 = __importDefault(__webpack_require__(/*! next-server/dist/lib/router/router */ "next-server/dist/lib/router/router"));

var SingletonRouter = {
  router: null,
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();

    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb);
    }
  }
}; // Create public properties and methods of the router in the SingletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath'];
var propertyFields = ['components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(SingletonRouter, 'events', {
  get: function get() {
    return router_1.default.events;
  }
});
propertyFields.concat(urlPropertyFields).forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty.default)(SingletonRouter, field, {
    get: function get() {
      throwIfNoRouter();
      return SingletonRouter.router[field];
    }
  });
});
coreMethodFields.forEach(function (field) {
  SingletonRouter[field] = function () {
    var _SingletonRouter$rout;

    throwIfNoRouter();
    return (_SingletonRouter$rout = SingletonRouter.router)[field].apply(_SingletonRouter$rout, arguments);
  };
});
routerEvents.forEach(function (event) {
  SingletonRouter.ready(function () {
    router_1.default.events.on(event, function () {
      var eventField = "on".concat(event.charAt(0).toUpperCase()).concat(event.substring(1));

      if (SingletonRouter[eventField]) {
        try {
          SingletonRouter[eventField].apply(SingletonRouter, arguments);
        } catch (err) {
          console.error("Error when running the Router event: ".concat(eventField));
          console.error("".concat(err.message, "\n").concat(err.stack));
        }
      }
    });
  });
});

function throwIfNoRouter() {
  if (!SingletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }
} // Export the SingletonRouter and this is the public API.


exports.default = SingletonRouter; // Reexport the withRoute HOC

var with_router_1 = __webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js");

exports.withRouter = with_router_1.default; // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.

exports.createRouter = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  SingletonRouter.router = (0, _construct2.default)(router_1.default, args);
  SingletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  SingletonRouter.readyCallbacks = [];
  return SingletonRouter.router;
}; // Export the actual Router class, which is usually used inside the server


exports.Router = router_1.default; // This function is used to create the `withRouter` router instance

function makePublicRouterInstance(router) {
  var instance = {};

  for (var _i = 0; _i < urlPropertyFields.length; _i++) {
    var property = urlPropertyFields[_i];

    if ((0, _typeof2.default)(router[property]) === 'object') {
      instance[property] = (0, _assign.default)({}, router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = router_1.default.events;
  propertyFields.forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    (0, _defineProperty.default)(instance, field, {
      get: function get() {
        return router[field];
      }
    });
  });
  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return router[field].apply(router, arguments);
    };
  });
  return instance;
}

exports.makePublicRouterInstance = makePublicRouterInstance;

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var hoist_non_react_statics_1 = __importDefault(__webpack_require__(/*! hoist-non-react-statics */ "./node_modules/next/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

function withRouter(ComposedComponent) {
  var displayName = utils_1.getDisplayName(ComposedComponent);

  var WithRouteWrapper =
  /*#__PURE__*/
  function (_react_1$Component) {
    (0, _inherits2.default)(WithRouteWrapper, _react_1$Component);

    function WithRouteWrapper() {
      (0, _classCallCheck2.default)(this, WithRouteWrapper);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WithRouteWrapper).apply(this, arguments));
    }

    (0, _createClass2.default)(WithRouteWrapper, [{
      key: "render",
      value: function render() {
        return react_1.default.createElement(ComposedComponent, (0, _assign.default)({
          router: this.context.router
        }, this.props));
      }
    }]);
    return WithRouteWrapper;
  }(react_1.Component);

  WithRouteWrapper.contextTypes = {
    router: prop_types_1.default.object
  };
  WithRouteWrapper.displayName = "withRouter(".concat(displayName, ")");
  return hoist_non_react_statics_1.default(WithRouteWrapper, ComposedComponent);
}

exports.default = withRouter;

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/next/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/next/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(/*! react-is */ "react-is");
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
        var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/next/router.js":
/*!*************************************!*\
  !*** ./node_modules/next/router.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/router */ "./node_modules/next/dist/client/router.js")


/***/ }),

/***/ "./node_modules/react-datepicker/dist/react-datepicker.css":
/*!*****************************************************************!*\
  !*** ./node_modules/react-datepicker/dist/react-datepicker.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/semantic-ui-css/semantic.min.css":
/*!*******************************************************!*\
  !*** ./node_modules/semantic-ui-css/semantic.min.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/orders/index.js":
/*!*******************************!*\
  !*** ./pages/orders/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hocs_securePage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/hocs/securePage */ "./hocs/securePage.js");
/* harmony import */ var _src_pages_orders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/src/pages/orders */ "./src/pages/orders/index.js");
/* harmony import */ var components_Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/Layout */ "./components/Layout.js");










var Orders =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Orders, _Component);

  function Orders() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Orders);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Orders).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Orders, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(components_Layout__WEBPACK_IMPORTED_MODULE_8__["default"], null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_src_pages_orders__WEBPACK_IMPORTED_MODULE_7__["default"], null));
    }
  }]);

  return Orders;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_hocs_securePage__WEBPACK_IMPORTED_MODULE_6__["default"])(Orders));

/***/ }),

/***/ "./src/components/Checkbox/CheckboxControlled.js":
/*!*******************************************************!*\
  !*** ./src/components/Checkbox/CheckboxControlled.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _checkbox_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checkbox.css */ "./src/components/Checkbox/checkbox.css");
/* harmony import */ var _checkbox_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_checkbox_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Checkbox/CheckboxControlled.js";




var CheckboxControlled =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(CheckboxControlled, _Component);

  function CheckboxControlled() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, CheckboxControlled);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(CheckboxControlled).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(CheckboxControlled, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "input-checkbox " + (this.props.inputClass || ''),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "checkbox",
        name: this.props.name,
        onChange: function onChange() {
          return _this.props.onChange(!_this.props.value);
        },
        onClick: typeof this.props.onClick == 'function' ? function (e) {
          return _this.props.onClick(e);
        } : function () {},
        checked: this.props.value,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "checkmark " + (this.props.className || ''),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: this
      }, "  "));
    }
  }]);

  return CheckboxControlled;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

CheckboxControlled.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  inputClass: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (CheckboxControlled);

/***/ }),

/***/ "./src/components/Checkbox/checkbox.css":
/*!**********************************************!*\
  !*** ./src/components/Checkbox/checkbox.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/ComboBox/ComboBox.css":
/*!**********************************************!*\
  !*** ./src/components/ComboBox/ComboBox.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/ComboBox/ComboBox.js":
/*!*********************************************!*\
  !*** ./src/components/ComboBox/ComboBox.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ComboBox_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ComboBox.css */ "./src/components/ComboBox/ComboBox.css");
/* harmony import */ var _ComboBox_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ComboBox_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! debounce */ "debounce");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _Spinner_Spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Spinner/Spinner */ "./src/components/Spinner/Spinner.js");






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/ComboBox/ComboBox.js";







var ComboBox =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ComboBox, _Component);

  function ComboBox(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ComboBox);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(ComboBox).call(this, props));
    _this.filterData = debounce__WEBPACK_IMPORTED_MODULE_8___default()(_this.filterData, _utils_constants__WEBPACK_IMPORTED_MODULE_10__["DEBOUNCE_TIME"]);
    _this.handleClickOutside = _this.handleClickOutside.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    _this.comboRef = react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef();
    _this.state = {
      fulltext: "",
      isOpen: false,
      results_count: _this.props.limit,
      results: [],
      hasSearched: false
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ComboBox, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      document.addEventListener('mousedown', this.handleClickOutside, false);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.currentValue) {
        this.setState({
          fulltext: this.props.currentValue
        }, function () {
          if (_this2.props.onChange) _this2.props.onChange(_this2.state.fulltext);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(e) {
      if (this.comboRef.current.contains(e.target)) return;
      this.setState({
        isOpen: false
      });
    }
  }, {
    key: "renderResults",
    value: function renderResults() {
      var _this3 = this;

      if (!this.state.hasSearched || !this.state.isOpen) return;
      if (this.props.isFetching) return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "combo-results",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_11__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }));
      if (this.state.results.length === 0) return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: 'combo-results',
        style: {
          maxHeight: 44 * this.state.results_count
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", {
        className: "combo-no-result",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, "No results"));
      var res = this.state.results.map(function (combo) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          key: combo.id,
          className: "combo-item",
          onClick: function onClick() {
            _this3.setState({
              fulltext: combo.name,
              hasSearched: false
            }, function () {
              if (_this3.props.onChange) _this3.props.onChange(_this3.state.fulltext);
              if (_this3.props.getObject) _this3.props.getObject(combo);
            });
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
          className: "combo-cas",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        }, combo.name));
      });
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: 'combo-results',
        style: {
          maxHeight: 44 * this.state.results_count
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, res);
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var _this4 = this;

      this.setState({
        fulltext: e.target.value,
        hasSearched: true,
        isOpen: true
      }, function () {
        if (_this4.state.fulltext.length > 0) _this4.filterData();
      });
    }
  }, {
    key: "filterData",
    value: function filterData() {
      var results = [];

      for (var i = 0; i < this.props.items.length; i++) {
        if (this.props.items[i].name.search(new RegExp(this.state.fulltext, "i")) !== -1) {
          results.push(this.props.items[i]);
        }
      }

      this.setState({
        results: results
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var fulltext = this.state.fulltext;
      var results = this.renderResults();
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: 'comboBox ' + this.props.className,
        ref: this.comboRef,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("i", {
        className: "fas fa-search combo-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        value: fulltext,
        onChange: function onChange(e) {
          return _this5.handleChange(e);
        },
        disabled: this.props.disabled || false,
        placeholder: this.props.placeholder || "Search",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }), results);
    }
  }]);

  return ComboBox;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

ComboBox.propTypes = {
  items: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string
  })).isRequired,
  getObject: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  className: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  limit: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number,
  label: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  isFetching: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  currentValue: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (ComboBox);

/***/ }),

/***/ "./src/components/ComboBox/ComboBoxRedux.js":
/*!**************************************************!*\
  !*** ./src/components/ComboBox/ComboBoxRedux.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ComboBox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ComboBox */ "./src/components/ComboBox/ComboBox.js");






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/ComboBox/ComboBoxRedux.js";





var ComboBoxRedux =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(ComboBoxRedux, _Component);

  function ComboBoxRedux() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ComboBoxRedux);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(ComboBoxRedux).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ComboBoxRedux, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          model = _this$props.model,
          dispatch = _this$props.dispatch;
      dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_8__["actions"].change(model, value));
      if (this.props.onChange) this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_8__["Control"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        className: this.props.className,
        limit: this.props.limit,
        label: this.props.label,
        model: this.props.model,
        placeholder: this.props.placeholder,
        component: _ComboBox__WEBPACK_IMPORTED_MODULE_9__["default"],
        disabled: this.props.disabled,
        validators: this.props.validators,
        onChange: function onChange(value) {
          return _this.handleChange(value);
        }
      }, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      }));
    }
  }]);

  return ComboBoxRedux;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

ComboBoxRedux.propTypes = {
  items: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
  })).isRequired,
  getObject: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  className: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  limit: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
  label: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  currentValue: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  model: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (ComboBoxRedux);

/***/ }),

/***/ "./src/components/Datepicker/Datepicker.js":
/*!*************************************************!*\
  !*** ./src/components/Datepicker/Datepicker.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-datepicker */ "react-datepicker");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _datepicker_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./datepicker.css */ "./src/components/Datepicker/datepicker.css");
/* harmony import */ var _datepicker_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_datepicker_css__WEBPACK_IMPORTED_MODULE_11__);






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Datepicker/Datepicker.js";







var Datepicker =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Datepicker, _React$Component);

  function Datepicker(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Datepicker);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Datepicker).call(this, props));
    _this.handleChange = _this.handleChange.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Datepicker, [{
    key: "handleChange",
    value: function handleChange(date) {
      this.props.onChange(moment__WEBPACK_IMPORTED_MODULE_9___default()(date).format('YYYY-MM-DD'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          placeholder = _this$props.placeholder;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "datepicker",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("i", {
        className: "far fa-calendar-alt datepicker-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_8___default.a, {
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        placeholder: placeholder,
        dateFormat: "YYYY-MM-DD",
        selected: value && value !== "" ? moment__WEBPACK_IMPORTED_MODULE_9___default()(value, 'YYYY-MM-DD') : null,
        onChange: this.handleChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      })));
    }
  }]);

  return Datepicker;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

Datepicker.propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Datepicker);

/***/ }),

/***/ "./src/components/Datepicker/DatepickerRedux.js":
/*!******************************************************!*\
  !*** ./src/components/Datepicker/DatepickerRedux.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Datepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Datepicker */ "./src/components/Datepicker/Datepicker.js");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Datepicker/DatepickerRedux.js";






var DatepickerRedux =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(DatepickerRedux, _React$Component);

  function DatepickerRedux() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, DatepickerRedux);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(DatepickerRedux).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(DatepickerRedux, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          model = _this$props.model,
          dispatch = _this$props.dispatch;
      dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["actions"].change(model, value));
      if (this.props.onChange) this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Control"], {
        model: this.props.model,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        component: _Datepicker__WEBPACK_IMPORTED_MODULE_6__["default"],
        validators: this.props.validators,
        placeholder: this.props.placeholder,
        onChange: function onChange(value) {
          return _this.handleChange(value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      });
    }
  }]);

  return DatepickerRedux;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

DatepickerRedux.propTypes = {
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  model: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (DatepickerRedux);

/***/ }),

/***/ "./src/components/Datepicker/datepicker.css":
/*!**************************************************!*\
  !*** ./src/components/Datepicker/datepicker.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/Dropdown/Dropdown.js":
/*!*********************************************!*\
  !*** ./src/components/Dropdown/Dropdown.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _dropdown_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dropdown.css */ "./src/components/Dropdown/dropdown.css");
/* harmony import */ var _dropdown_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_dropdown_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../images/inv-filter/dropdown-close.png */ "./src/images/inv-filter/dropdown-close.png");
/* harmony import */ var _images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../images/inv-filter/dropdown.png */ "./src/images/inv-filter/dropdown.png");
/* harmony import */ var _images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_11__);






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Dropdown/Dropdown.js";







var Dropdown =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Dropdown);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Dropdown).call(this, props));
    _this.setCurrentValue = _this.setCurrentValue.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    _this.handleClickOutside = _this.handleClickOutside.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    _this.dropdownRef = react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef();
    _this.state = {
      isOpen: false,
      currentValue: _this.props.currentValue,
      results_count: 5
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Dropdown, [{
    key: "setCurrentValue",
    value: function setCurrentValue(id, val) {
      var _this2 = this;

      this.setState({
        currentValue: val,
        isOpen: false
      }, function () {
        if (_this2.props.onChange) _this2.props.onChange(id);
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.redux) {
        var cv = nextProps.currentValue ? nextProps.currentValue : '';
        var opnsLength = nextProps.opns ? nextProps.opns.length : 0;

        for (var i = 0; i < opnsLength; i++) {
          if (nextProps.opns[i].id === nextProps.value) {
            cv = nextProps.opns[i].name || nextProps.opns[i].warehouseName;
            break;
          }
        }

        this.setState({
          currentValue: cv,
          isOpen: false
        });
      } else if (nextProps.currentValue) {
        this.setState({
          currentValue: nextProps.currentValue,
          isOpen: false
        });
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      document.addEventListener('mousedown', this.handleClickOutside, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(e) {
      if (this.dropdownRef.current.contains(e.target)) return;
      this.setState({
        isOpen: false
      });
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown(opt) {
      var _this3 = this;

      if (this.props.disabled) return;
      return opt.map(function (option, index) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
          key: index + 'dropdown',
          onClick: function onClick() {
            _this3.setCurrentValue(option.id, option.name || option.warehouseName);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: this
        }, option.name || option.warehouseName);
      });
    }
  }, {
    key: "toggleDropdown",
    value: function toggleDropdown() {
      if (this.props.disabled) return;
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var arrow = !this.state.isOpen ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
        alt: "up",
        src: _images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10___default.a,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
        alt: "up",
        src: _images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_11___default.a,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      });
      var _this$state = this.state,
          currentValue = _this$state.currentValue,
          isOpen = _this$state.isOpen;
      var isSelected = false;
      var opnsLength = this.props.opns ? this.props.opns.length : 0;

      for (var i = 0; i < opnsLength; i++) {
        if (this.props.opns[i].id === this.props.value) {
          isSelected = true;
          break;
        }
      }

      var options = this.state.isOpen ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
        className: "dropdown-options",
        style: {
          maxHeight: 39 * this.state.results_count
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, this.renderDropdown(this.props.opns)) : null;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "dropdown-wr",
        ref: this.dropdownRef,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: 'dropdown-trigger ' + classnames__WEBPACK_IMPORTED_MODULE_9___default()({
          'disabled': this.props.disabled,
          'open': isOpen,
          'selected': isSelected
        }),
        onClick: function onClick() {
          return _this4.toggleDropdown();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "dropdown-current-placeholder",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, currentValue || this.props.placeholder || 'Select', arrow)), options);
    }
  }]);

  return Dropdown;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

Dropdown.propTypes = {
  opns: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
  })).isRequired,
  currentValue: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Dropdown);

/***/ }),

/***/ "./src/components/Dropdown/DropdownRedux.js":
/*!**************************************************!*\
  !*** ./src/components/Dropdown/DropdownRedux.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Dropdown */ "./src/components/Dropdown/Dropdown.js");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_9__);






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Dropdown/DropdownRedux.js";






var DropdownRedux =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(DropdownRedux, _Component);

  function DropdownRedux() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, DropdownRedux);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(DropdownRedux).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(DropdownRedux, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          model = _this$props.model,
          dispatch = _this$props.dispatch;
      dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_9__["actions"].change(model, value));
      if (this.props.onChange) this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_9__["Control"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        model: this.props.model,
        component: _Dropdown__WEBPACK_IMPORTED_MODULE_8__["default"],
        redux: true,
        validators: this.props.validators,
        onChange: function onChange(value) {
          return _this.handleChange(value);
        }
      }, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }));
    }
  }]);

  return DropdownRedux;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_Dropdown__WEBPACK_IMPORTED_MODULE_8__["default"].propTypes = {
  opns: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
  })).isRequired,
  currentValue: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  model: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (DropdownRedux);

/***/ }),

/***/ "./src/components/Dropdown/dropdown.css":
/*!**********************************************!*\
  !*** ./src/components/Dropdown/dropdown.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/Filter/Filter.js":
/*!*****************************************!*\
  !*** ./src/components/Filter/Filter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/entries */ "./node_modules/@babel/runtime-corejs2/core-js/object/entries.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _filter_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./filter.css */ "./src/components/Filter/filter.css");
/* harmony import */ var _filter_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_filter_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/FilterGroup */ "./src/components/Filter/components/FilterGroup.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/functions */ "./src/utils/functions.js");
/* harmony import */ var _components_SavedFilters_SavedFilters__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/SavedFilters/SavedFilters */ "./src/components/Filter/components/SavedFilters/SavedFilters.js");
/* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-perfect-scrollbar */ "react-perfect-scrollbar");
/* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/auth */ "./src/utils/auth.js");








var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Filter/Filter.js";












var Filter =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(Filter, _Component);

  function Filter(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Filter);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Filter).call(this, props));
    _this.state = {
      isOpen: false,
      saveFilter: false,
      filterSwitch: true,
      filterName: ""
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Filter, [{
    key: "handleSubmit",
    value: function handleSubmit(inputs) {
      if (Object(_utils_auth__WEBPACK_IMPORTED_MODULE_18__["checkToken"])(this.props)) return;

      var filter = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, inputs, {
        pckgs: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.pckgs || {}).filter(function (_ref) {
          var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return value;
        }).map(function (_ref3) {
          var _ref4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref3, 1),
              key = _ref4[0];

          return key;
        })
      }, {
        cndt: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.cndt || {}).filter(function (_ref5) {
          var _ref6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          return value;
        }).map(function (_ref7) {
          var _ref8 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref7, 1),
              key = _ref8[0];

          return key;
        })
      }, {
        grade: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.grade || {}).filter(function (_ref9) {
          var _ref10 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref9, 2),
              key = _ref10[0],
              value = _ref10[1];

          return value;
        }).map(function (_ref11) {
          var _ref12 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref11, 1),
              key = _ref12[0];

          return key;
        })
      }, {
        frm: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.frm || {}).filter(function (_ref13) {
          var _ref14 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref13, 2),
              key = _ref14[0],
              value = _ref14[1];

          return value;
        }).map(function (_ref15) {
          var _ref16 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref15, 1),
              key = _ref16[0];

          return key;
        })
      });

      var params = Object(_utils_functions__WEBPACK_IMPORTED_MODULE_14__["filterNonEmptyAttributes"])(filter);
      this.props.filterFunc(params);
      var filterTags = [];

      for (var tag in params) {
        filterTags.push({
          name: tag,
          value: params[tag]
        });
      }

      this.props.addFilterTag(filterTags);
      this.props.toggleFilter();
      this.switchFilter(true);
    }
  }, {
    key: "handleReset",
    value: function handleReset(e) {
      if (Object(_utils_auth__WEBPACK_IMPORTED_MODULE_18__["checkToken"])(this.props)) return;
      e.preventDefault();
      this.props.resetForm('forms.filter');
      this.props.filterFunc({});
      this.props.addFilterTag([]);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchProductConditions();
      this.props.fetchProductForms();
      this.props.fetchPackagingTypes();
      this.props.fetchWarehouseDistances();
      this.props.fetchProductGrade();
    }
  }, {
    key: "deleteSaveFilter",
    value: function deleteSaveFilter(id) {
      var _this2 = this;

      this.props.deleteSaveFilter(id).then(function () {
        return _this2.props.fetchSavedFilters();
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }, {
    key: "changeFilterName",
    value: function changeFilterName(e) {
      this.setState({
        filterName: e.target.value
      });
    }
  }, {
    key: "switchFilter",
    value: function switchFilter(value) {
      this.setState({
        filterSwitch: value
      });
    }
  }, {
    key: "saveFilters",
    value: function saveFilters() {
      var _this3 = this;

      var inputs = this.props.filterData;

      var filter = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, inputs, {
        containers: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.pckgs || {}).filter(function (_ref17) {
          var _ref18 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref17, 2),
              key = _ref18[0],
              value = _ref18[1];

          return value;
        }).map(function (_ref19) {
          var _ref20 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref19, 1),
              key = _ref20[0];

          return key;
        })
      }, {
        conditions: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.cndt || {}).filter(function (_ref21) {
          var _ref22 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref21, 2),
              key = _ref22[0],
              value = _ref22[1];

          return value;
        }).map(function (_ref23) {
          var _ref24 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref23, 1),
              key = _ref24[0];

          return key;
        })
      }, {
        forms: _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_1___default()(inputs.frm || {}).filter(function (_ref25) {
          var _ref26 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref25, 2),
              key = _ref26[0],
              value = _ref26[1];

          return value;
        }).map(function (_ref27) {
          var _ref28 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref27, 1),
              key = _ref28[0];

          return key;
        })
      }, {
        filterName: this.state.filterName
      }, {
        quantityFrom: inputs.qntylb || ""
      }, {
        quantityTo: inputs.qntyub || ""
      }, {
        priceFrom: inputs.prclb || ""
      }, {
        priceTo: inputs.prcub || ""
      }, {
        chemicalName: inputs.search || ""
      });

      this.props.saveSaveFilter(filter).then(function () {
        return _this3.setState({
          saveFilter: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var saveFilter = this.state.saveFilter ? react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("span", {
        className: "savedButton",
        onClick: function onClick() {
          return _this4.saveFilters();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "filter.saved",
        defaultMessage: "Saved",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        },
        __self: this
      })) : react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("span", {
        className: "saveButton",
        onClick: function onClick() {
          return _this4.saveFilters();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "global.save",
        defaultMessage: "Save",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }));
      return this.state.isOpen ? react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "filter-switch",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("span", {
        className: "set-filters" + classnames__WEBPACK_IMPORTED_MODULE_10___default()({
          ' active': !this.state.filterSwitch
        }),
        onClick: function onClick() {
          return _this4.switchFilter(true);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "filter.setFilters",
        defaultMessage: "SET FILTERS",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("span", {
        className: "saved-filters" + classnames__WEBPACK_IMPORTED_MODULE_10___default()({
          ' active': this.state.filterSwitch
        }),
        onClick: function onClick() {
          return _this4.switchFilter(false);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "filter.savedFilter",
        defaultMessage: "SAVED FILTERS",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }))), this.state.filterSwitch ? react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_8__["Form"], {
        model: "forms.filter",
        onSubmit: function onSubmit(val) {
          return _this4.handleSubmit(val);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "order",
        isVisible: !!this.props.orderId,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.orderId,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('orderId', value);
        },
        inputs: [{
          label: 'orderId',
          model: '.orderId',
          type: 'text'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "orderDate",
        isVisible: !!this.props.orderDate,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.orderDate,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('orderDate', value);
        },
        split: true,
        inputs: [{
          label: 'orderFrom',
          model: '.orderFrom',
          type: 'date'
        }, {
          label: 'orderTo',
          model: '.orderTo',
          type: 'date'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "customer",
        isVisible: !!this.props.customer,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.customer,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('customer', value);
        },
        inputs: [{
          label: 'customerName',
          model: '.customer',
          type: 'text'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "product",
        isVisible: !!this.props.product,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.product,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('product', value);
        },
        inputs: [{
          label: 'productName',
          model: '.product',
          type: 'text'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "orderStatus",
        isVisible: !!this.props.orderStatus,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.orderStatus,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('orderStatus', value);
        },
        dispatch: this.props.dispatch,
        inputs: [{
          label: 'orderStatus',
          model: '.status',
          type: 'dropdown',
          data: [{
            id: 'All',
            name: 'All'
          }, {
            id: 'Pending',
            name: 'Pending'
          }, {
            id: 'In Transit',
            name: 'In Transit'
          }, {
            id: 'Review',
            name: 'Review'
          }, {
            id: 'Credit',
            name: 'Credit'
          }, {
            id: 'Completed',
            name: 'Completed'
          }, {
            id: 'Returned',
            name: 'Returned'
          }, {
            id: 'Declined',
            name: 'Declined'
          }],
          filterValue: this.props.orderStatus && this.props.orderStatus.filterValue ? this.props.orderStatus.filterValue : null
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "chemicalType",
        isVisible: !!this.props.chemicalName,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.chemName,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('chemName', value);
        },
        inputs: [{
          label: 'ChemicalNameCAS',
          model: '.search',
          type: 'text'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 220
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        isVisible: !!this.props.quantity,
        isOpen: this.props.filterGroupStatus.quantity,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('quantity', value);
        },
        header: "quantity",
        data: this.props.filterData,
        split: true,
        inputs: [{
          label: 'FromQuantity',
          model: '.qntylb',
          type: 'number',
          placeholder: '0'
        }, {
          label: 'ToQuantity',
          model: '.qntyub',
          type: 'number',
          placeholder: '0'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 233
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "price",
        split: true,
        isVisible: !!this.props.price,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.price,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('price', value);
        },
        inputs: [{
          label: 'FromPrice',
          model: '.prclb',
          type: 'number',
          placeholder: '0'
        }, {
          label: 'ToPrice',
          model: '.prcub',
          type: 'number',
          placeholder: '0'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 254
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "packaging",
        isVisible: !!this.props.package,
        split: true,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.packaging,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('packaging', value);
        },
        checkboxModel: "pckgs",
        inputs: this.props.packagingTypes.map(function (packagingType) {
          return {
            label: packagingType.name,
            type: 'checkbox',
            id: packagingType.id,
            model: ".pckgs[".concat(packagingType.id, "]")
          };
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 275
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "grade",
        isVisible: !!this.props.productGrade,
        split: true,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.productGrade,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('productGrade', value);
        },
        checkboxModel: "grade",
        inputs: this.props.productGradeTypes.map(function (productGradeType) {
          return {
            label: productGradeType.name,
            type: 'checkbox',
            id: productGradeType.id,
            model: ".grade[".concat(productGradeType.id, "]")
          };
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 289
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "condition",
        isVisible: !!this.props.condition,
        split: true,
        data: this.props.productConditions,
        isOpen: this.props.filterGroupStatus.condition,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('condition', value);
        },
        checkboxModel: "cndt",
        inputs: this.props.productConditions.map(function (condition) {
          return {
            label: condition.name,
            type: 'checkbox',
            id: condition.id,
            model: ".cndt[".concat(condition.id, "]")
          };
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 303
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "form",
        isVisible: !!this.props.form,
        split: true,
        data: this.props.productForms,
        isOpen: this.props.filterGroupStatus.form,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('form', value);
        },
        checkboxModel: "frm",
        inputs: this.props.productForms.map(function (form) {
          return {
            label: form.name,
            type: 'checkbox',
            id: form.id,
            model: ".frm[".concat(form.id, "]")
          };
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 317
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "chemicalSearch",
        isVisible: !!this.props.chemicalSearch,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.chemSearch,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('chemSearch', value);
        },
        inputs: [{
          label: 'ChemicalSearch',
          model: '.chemSearch',
          type: 'text'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 336
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "productAge",
        isVisible: !!this.props.productsAge,
        split: true,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.productAge,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('productAge', value);
        },
        dispatch: this.props.dispatch,
        inputs: [{
          model: 'forms.filter.data.productAge',
          type: 'radio'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 350
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "location",
        isVisible: !!this.props.loc,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.loc,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('loc', value);
        },
        dispatch: this.props.dispatch,
        inputs: [{
          label: 'Max. miles away',
          model: 'forms.filter.data.loc',
          type: 'dropdown'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 364
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        header: "expiration",
        split: true,
        isVisible: !!this.props.date,
        data: this.props.filterData,
        isOpen: this.props.filterGroupStatus.date,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('date', value);
        },
        dispatch: this.props.dispatch,
        inputs: [{
          label: 'From',
          model: '.agelb',
          type: 'date'
        }, {
          label: 'To',
          model: '.ageub',
          type: 'date'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 378
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_FilterGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "filterGroup",
        isVisible: !!this.props.assay,
        isOpen: this.props.filterGroupStatus.assay,
        onOpen: function onOpen(value) {
          _this4.props.toggleFilterGroup('assay', value);
        },
        header: "Assay",
        data: this.props.filterData,
        split: true,
        inputs: [{
          label: 'Minimum(%)',
          model: '.assaylb',
          type: 'assay',
          placeholder: '0'
        }, {
          label: 'Maximum(%)',
          model: '.assayub',
          type: 'assay',
          placeholder: '0',
          bigger: true
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "save-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 420
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 421
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "filter.saveFilter",
        defaultMessage: "Save Filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 422
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "filter-input-text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 427
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("label", {
        className: "input-label",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 428
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "filter.enterFilterName",
        defaultMessage: "Enter Filter Name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 429
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_12___default.a.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 434
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("input", {
        type: "text",
        onChange: function onChange(e) {
          return _this4.changeFilterName(e);
        },
        placeholder: this.props.intl.formatMessage({
          id: 'filter.setFilterName',
          defaultMessage: 'Set Filter Name'
        }),
        className: "input",
        value: this.state.filterName,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 435
        },
        __self: this
      }), saveFilter)))), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "filterBottom",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 450
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("button", {
        className: "button filter-button",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 451
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "global.apply",
        defaultMessage: "Apply",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 452
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("button", {
        className: "button disabled filter-button",
        onClick: function onClick(e) {
          _this4.handleReset(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 457
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["FormattedMessage"], {
        id: "filter.clearFilter",
        defaultMessage: "Clear Filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 460
        },
        __self: this
      })))) : react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_components_SavedFilters_SavedFilters__WEBPACK_IMPORTED_MODULE_15__["default"], {
        fetchSavedFilters: this.props.fetchSavedFilters,
        deleteSaveFilter: function deleteSaveFilter(id) {
          return _this4.deleteSaveFilter(id);
        },
        fillFilter: function fillFilter(inputs) {
          return _this4.props.fillFilter(inputs);
        },
        filterFunc: function filterFunc(inputs) {
          return _this4.handleSubmit(inputs);
        },
        saveFilters: this.props.saveFilters,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 468
        },
        __self: this
      })) : null;
    }
  }]);

  return Filter;
}(react__WEBPACK_IMPORTED_MODULE_12__["Component"]);

Filter.propTypes = {
  filterFunc: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_intl__WEBPACK_IMPORTED_MODULE_17__["injectIntl"])(Filter));

/***/ }),

/***/ "./src/components/Filter/components/FilterGroup.js":
/*!*********************************************************!*\
  !*** ./src/components/Filter/components/FilterGroup.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/validation */ "./src/utils/validation.js");
/* harmony import */ var _images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../images/inv-filter/dropdown.png */ "./src/images/inv-filter/dropdown.png");
/* harmony import */ var _images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../images/inv-filter/dropdown-close.png */ "./src/images/inv-filter/dropdown-close.png");
/* harmony import */ var _images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Dropdown_DropdownRedux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../Dropdown/DropdownRedux */ "./src/components/Dropdown/DropdownRedux.js");
/* harmony import */ var _Radio_RadioRedux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../Radio/RadioRedux */ "./src/components/Radio/RadioRedux.js");
/* harmony import */ var _Datepicker_DatepickerRedux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../Datepicker/DatepickerRedux */ "./src/components/Datepicker/DatepickerRedux.js");
/* harmony import */ var _ComboBox_ComboBoxRedux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../ComboBox/ComboBoxRedux */ "./src/components/ComboBox/ComboBoxRedux.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_16__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Filter/components/FilterGroup.js";













var FilterGroup =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(FilterGroup, _Component);

  function FilterGroup(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FilterGroup);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(FilterGroup).call(this, props));
    _this.state = {
      isOpen: _this.props.isOpen
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FilterGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      for (var i = 0; i < this.props.inputs.length; i++) {
        if (this.props.inputs[i].type === 'checkbox') {
          if (this.props.data[this.props.checkboxModel] && this.props.data[this.props.checkboxModel][this.props.inputs[i].id]) {
            this.props.onOpen(true);
          }
        } else {
          if (this.props.data[this.props.inputs[i].model.substring(1)] && this.props.data[this.props.inputs[i].model.substring(1)] !== '') {
            this.props.onOpen(true);
          }
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen !== this.state.isOpen) this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }, {
    key: "renderInputs",
    value: function renderInputs() {
      var _this2 = this;

      if (!this.props.inputs) return;
      return this.state.isOpen ? this.props.inputs.map(function (input, index) {
        switch (input.type) {
          case 'checkbox':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "input-checkbox",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 51
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                key: index,
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 52
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
                id: 'filter.' + input.label.split(' ').join(''),
                defaultMessage: input.label + '1',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 53
                },
                __self: this
              }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Control"].checkbox, {
                model: input.model,
                id: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 57
                },
                __self: this
              }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
                className: "checkmark",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 58
                },
                __self: this
              }, "  ")));
            }

          case 'radio':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-radio",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 65
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 66
                },
                __self: this
              }, input.label), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Radio_RadioRedux__WEBPACK_IMPORTED_MODULE_13__["default"], {
                dispatch: _this2.props.dispatch,
                model: input.model,
                opns: [{
                  label: '0-3 months',
                  value: '100'
                }, {
                  label: '3-6 months',
                  value: '500'
                }, {
                  label: '6-9 months',
                  value: '1000'
                }, {
                  label: 'Custom Product Age',
                  value: '10000'
                }],
                productAgeModel: _this2.props.productAgeModel,
                productAgeCustomModel: _this2.props.productAgeCustomModel,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 67
                },
                __self: this
              }));
            }

          case 'dropdown':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-dropdown",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 86
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 87
                },
                __self: this
              }, input.label), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Dropdown_DropdownRedux__WEBPACK_IMPORTED_MODULE_12__["default"], {
                dispatch: _this2.props.dispatch,
                model: input.model,
                opns: input.data,
                currentValue: input.filterValue,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 88
                },
                __self: this
              }));
            }

          case 'comboBox':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-dropdown",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 99
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 100
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
                id: input.label.split(' ').join(''),
                defaultMessage: input.label + '1',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 103
                },
                __self: this
              })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_ComboBox_ComboBoxRedux__WEBPACK_IMPORTED_MODULE_15__["default"], {
                dispatch: _this2.props.dispatch,
                model: input.model,
                limit: input.limit,
                placeholder: "Select Condition",
                items: input.data,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 108
                },
                __self: this
              }));
            }

          case 'date':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-date",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 120
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 121
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
                id: 'filter.' + input.label.split(' ').join(''),
                defaultMessage: input.label + '1',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 124
                },
                __self: this
              })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Datepicker_DatepickerRedux__WEBPACK_IMPORTED_MODULE_14__["default"], {
                dispatch: _this2.props.dispatch,
                model: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 129
                },
                __self: this
              }));
            }

          case 'text':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-text",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 138
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 139
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
                id: 'filter.' + input.label.split(' ').join(''),
                defaultMessage: input.label + '1',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 142
                },
                __self: this
              })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Control"].text, {
                type: input.type,
                model: input.model,
                id: input.model,
                placeholder: input.placeholder,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 147
                },
                __self: this
              }));
            }

          case 'number':
            {
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-text",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 153
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 154
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
                id: 'filter.' + input.label,
                defaultMessage: input.label + '1',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 155
                },
                __self: this
              })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Errors"], {
                className: "form-error",
                model: input.model,
                show: "touched",
                messages: {
                  isNumber: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["messages"].isNumber,
                  min: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["messages"].min
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 160
                },
                __self: this
              }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Control"].text, {
                type: input.type,
                model: input.model,
                id: input.model,
                placeholder: _this2.props.intl.formatMessage({
                  id: 'filter.' + input.label
                }),
                validators: {
                  min: function min(val) {
                    return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_8__["min"])(val, 0) || !val;
                  }
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 169
                },
                __self: this
              }));
            }

          case 'assay':
            {
              var validator = input.bigger ? {
                bigger: function bigger(val) {
                  return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_8__["bigger"])(val, _this2.props.data.assmin);
                },
                min: function min(val) {
                  return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_8__["min"])(val, 0);
                },
                maxPercent: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["maxPercent"],
                isNumber: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["isNumber"]
              } : {
                min: function min(val) {
                  return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_8__["min"])(val, 0);
                },
                maxPercent: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["maxPercent"],
                isNumber: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["isNumber"]
              };
              return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
                key: index,
                className: "filter-input-text",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 184
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
                className: "input-label",
                htmlFor: input.model,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 185
                },
                __self: this
              }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
                id: 'filter.' + input.label,
                defaultMessage: input.label,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 188
                },
                __self: this
              })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Errors"], {
                className: "form-error",
                model: input.model,
                show: "touched",
                messages: {
                  bigger: input.bigger ? _utils_validation__WEBPACK_IMPORTED_MODULE_8__["messages"].bigger : null,
                  maxPercent: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["messages"].maxPercent,
                  isNumber: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["messages"].isNumber,
                  min: _utils_validation__WEBPACK_IMPORTED_MODULE_8__["messages"].min
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 193
                },
                __self: this
              }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_7__["Control"].text, {
                type: input.type,
                model: input.model,
                id: input.model,
                placeholder: input.placeholder,
                validators: validator,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 204
                },
                __self: this
              }));
            }

          default:
            {
              return null;
            }
        }
      }) : null;
    } //TODO::refactor render

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (!this.props.isVisible) return null;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_11___default()("filter-group", {
          "split": this.props.split
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "header",
        onClick: function onClick() {
          return _this3.props.onOpen(!_this3.state.isOpen);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "dropdown-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        },
        __self: this
      }, this.state.isOpen ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        src: _images_inv_filter_dropdown_png__WEBPACK_IMPORTED_MODULE_9___default.a,
        alt: "drop",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 233
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        src: _images_inv_filter_dropdown_close_png__WEBPACK_IMPORTED_MODULE_10___default.a,
        alt: "drop-close",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
        id: 'filter.' + this.props.header,
        defaultMessage: this.props.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 238
        },
        __self: this
      })), this.renderInputs(), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "clearfix",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 244
        },
        __self: this
      }));
    }
  }]);

  return FilterGroup;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

FilterGroup.propTypes = {
  inputs: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.shape({
    label: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    placeholder: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    model: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired,
    filterValue: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
  })),
  split: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  open: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  location: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_intl__WEBPACK_IMPORTED_MODULE_16__["injectIntl"])(FilterGroup));

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/SaveFilterItem.js":
/*!*************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/SaveFilterItem.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _SavedFilters_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SavedFilters.css */ "./src/components/Filter/components/SavedFilters/SavedFilters.css");
/* harmony import */ var _SavedFilters_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_SavedFilters_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _TooltipFilter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TooltipFilter */ "./src/components/Filter/components/SavedFilters/TooltipFilter.js");
/* harmony import */ var _images_bell_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../images/bell.png */ "./src/images/bell.png");
/* harmony import */ var _images_bell_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_images_bell_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _images_bell_transparent_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../images/bell_transparent.png */ "./src/images/bell_transparent.png");
/* harmony import */ var _images_bell_transparent_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_images_bell_transparent_png__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _images_remove_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../images/remove.png */ "./src/images/remove.png");
/* harmony import */ var _images_remove_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_images_remove_png__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _Checkbox_CheckboxControlled__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../Checkbox/CheckboxControlled */ "./src/components/Checkbox/CheckboxControlled.js");
/* harmony import */ var _actions_SaveFilterItem_actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./actions/SaveFilterItem.actions */ "./src/components/Filter/components/SavedFilters/actions/SaveFilterItem.actions.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_20__);










var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Filter/components/SavedFilters/SaveFilterItem.js";












var mapStateToProps = function mapStateToProps(state) {
  var _functionality;

  var _state$saveFilterItem = state.saveFilterItem,
      bellKey = _state$saveFilterItem.bellKey,
      bell = _state$saveFilterItem["bell".concat(bellKey)],
      notificationsKey = _state$saveFilterItem.notificationsKey,
      notifications = _state$saveFilterItem["notifications".concat(notificationsKey)],
      selectedKey = _state$saveFilterItem.selectedKey,
      selected = _state$saveFilterItem["selected".concat(selectedKey)],
      activeKey = _state$saveFilterItem.activeKey,
      active = _state$saveFilterItem["active".concat(activeKey)],
      emailKey = _state$saveFilterItem.emailKey,
      email = _state$saveFilterItem["email".concat(emailKey)],
      mobileKey = _state$saveFilterItem.mobileKey,
      mobile = _state$saveFilterItem["mobile".concat(mobileKey)],
      systemKey = _state$saveFilterItem.systemKey,
      system = _state$saveFilterItem["system".concat(systemKey)],
      toolTipKey = _state$saveFilterItem.toolTipKey,
      toolTip = _state$saveFilterItem["toolTip".concat(toolTipKey)];

  return {
    functionality: (_functionality = {}, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "bell".concat(bellKey), bell), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "notifications".concat(notificationsKey), notifications), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "selected".concat(selectedKey), selected), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "active".concat(activeKey), active), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "email".concat(emailKey), email), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "mobile".concat(mobileKey), mobile), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "system".concat(systemKey), system), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_functionality, "toolTip".concat(toolTipKey), toolTip), _functionality)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    show: function show(data, key) {
      return dispatch(Object(_actions_SaveFilterItem_actions__WEBPACK_IMPORTED_MODULE_19__["display"])(data, key));
    }
  };
};

var SaveFilterItem =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(SaveFilterItem, _Component);

  function SaveFilterItem(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, SaveFilterItem);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(SaveFilterItem).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "state", {
      showTooltip: false
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "renderInputs", function () {
      //:TODO when BE is done finish save and saved button
      var saveFilter = _this.state.saveFilter ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "savedButton",
        onClick: function onClick() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
        id: "filter.saved",
        defaultMessage: "Saved",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      })) : react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "saveButton",
        onClick: function onClick() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["FormattedMessage"], {
        id: "global.save",
        defaultMessage: "Save",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }));
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "inputs",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_Checkbox_CheckboxControlled__WEBPACK_IMPORTED_MODULE_18__["default"], {
        label: "Email Notifications",
        name: "emailNotifications",
        onChange: function onChange() {},
        onClick: function onClick() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "email",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_17__["Control"].text, {
        type: "text",
        model: "emailNotifications",
        id: "emailNotifications",
        placeholder: "Your E-mail",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_Checkbox_CheckboxControlled__WEBPACK_IMPORTED_MODULE_18__["default"], {
        label: "Mobile Notifications",
        name: "mobileNotifications",
        onChange: function onChange() {},
        onClick: function onClick() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_Checkbox_CheckboxControlled__WEBPACK_IMPORTED_MODULE_18__["default"], {
        label: "System Notifications",
        name: "systemNotifications",
        onChange: function onChange() {},
        onClick: function onClick() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      })), saveFilter);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "renderNotification", function () {
      var _this$props = _this.props,
          show = _this$props.show,
          index = _this$props.index;

      var active = _this.props.functionality["active".concat(index)];

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }, "Notifications"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        },
        __self: this
      }, "Enable notifications"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "brc-radio-wrapper",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "label",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }, active ? "On" : "Off"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "switch-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 166
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("label", {
        className: "switch",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        onClick: function onClick() {
          show('active', index);
        },
        className: "slider round ".concat(active ? "brc-radio active" : "brc-radio", " "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        },
        __self: this
      })))), active ? _this.renderInputs() : null);
    });

    _this.toolTip = false;
    _this.state = {
      bell: false,
      notification: false,
      selected: false,
      active: false,
      checkbox: {
        email: false
      }
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(SaveFilterItem, [{
    key: "formatNameToStore",
    value: function formatNameToStore(name) {
      switch (name) {
        case 'chemicalName':
          return 'search';

        case 'quantityFrom':
          return 'qntylb';

        case 'quantityTo':
          return 'qntyub';

        case 'priceFrom':
          return 'prclb';

        case 'priceTo':
          return 'prcub';

        case 'distanceLimit':
          return 'Distance limit';

        case 'containers':
          return 'pckgs';

        case 'grades':
          return 'grade';

        case 'forms':
          return 'form';

        case 'conditions':
          return 'condition';

        case 'origin':
          return 'origin';

        case 'manufacturer':
          return 'manufacturer';

        case 'zip':
          return 'zip';

        default:
          return name;
      }
    }
  }, {
    key: "fillFilter",
    value: function fillFilter() {
      var _this2 = this;

      var inputs = this.props.toolTipContent.reduce(function (ac, item) {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, ac, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])({}, _this2.formatNameToStore(item.name), _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default()(item.value) ? item.value.reduce(function (acc, cur) {
          return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, acc, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])({}, cur.id, true));
        }, {}) : Object(_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(item.value) === 'object' ? item.value.id : item.value));
      }, {});
      this.props.fillFilter(inputs);
      this.props.filterFunc(inputs);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          show = _this$props2.show,
          index = _this$props2.index,
          toolTipContent = _this$props2.toolTipContent,
          filterName = _this$props2.filterName,
          deleteSaveFilter = _this$props2.deleteSaveFilter;

      var _this$props$functiona = this.props.functionality,
          selected = _this$props$functiona["selected".concat(index)],
          toolTip = _this$props$functiona["toolTip".concat(index)],
          bell = _this$props$functiona["bell".concat(index)],
          notifications = _this$props$functiona["notifications".concat(index)];

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("li", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        onClick: function onClick() {
          return _this3.fillFilter();
        },
        onMouseEnter: function onMouseEnter() {
          show('toolTip', index);
        },
        onMouseLeave: function onMouseLeave() {
          show('toolTip', index);
        },
        className: "filter-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_TooltipFilter__WEBPACK_IMPORTED_MODULE_12__["default"], {
        selected: selected,
        index: index,
        name: filterName,
        isVisible: toolTip,
        content: toolTipContent,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "filter-delete",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "bell",
        onMouseEnter: function onMouseEnter() {
          show('bell', index);
        },
        onMouseLeave: function onMouseLeave() {
          show('bell', index);
        },
        onClick: function onClick() {
          show('selected', index);
          show('notifications', index);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 211
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
        src: bell ? _images_bell_png__WEBPACK_IMPORTED_MODULE_13___default.a : _images_bell_transparent_png__WEBPACK_IMPORTED_MODULE_14___default.a,
        alt: "bell",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 224
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "close test",
        onClick: function onClick() {
          return deleteSaveFilter(_this3.props.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
        src: _images_remove_png__WEBPACK_IMPORTED_MODULE_15___default.a,
        alt: "close",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 229
        },
        __self: this
      }))), notifications ? this.renderNotification() : null);
    }
  }]);

  return SaveFilterItem;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_20__["connect"])(mapStateToProps, mapDispatchToProps)(SaveFilterItem));

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/SavedFilters.css":
/*!************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/SavedFilters.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/SavedFilters.js":
/*!***********************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/SavedFilters.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SavedFilters_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SavedFilters.css */ "./src/components/Filter/components/SavedFilters/SavedFilters.css");
/* harmony import */ var _SavedFilters_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_SavedFilters_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _SaveFilterItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SaveFilterItem */ "./src/components/Filter/components/SavedFilters/SaveFilterItem.js");





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Filter/components/SavedFilters/SavedFilters.js";




var SavedFilters =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(SavedFilters, _Component);

  function SavedFilters() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SavedFilters);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(SavedFilters).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SavedFilters, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchSavedFilters();
    }
  }, {
    key: "renderSaveItems",
    value: function renderSaveItems(saved) {
      var _this = this;

      return saved.map(function (item, index) {
        var filterName = item.filterName;
        var final = [];

        for (var key in item) {
          if (key === 'filterName' || key === 'id' || !item[key]) continue;
          final.push({
            name: key,
            value: item[key]
          });
        }

        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_SaveFilterItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
          id: item.id,
          deleteSaveFilter: _this.props.deleteSaveFilter,
          fillFilter: _this.props.fillFilter,
          filterFunc: _this.props.filterFunc,
          filterName: filterName,
          index: index,
          key: index,
          toolTipContent: final,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          },
          __self: this
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", {
        className: "saved-filters",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        },
        __self: this
      }, this.renderSaveItems(this.props.saveFilters));
    }
  }]);

  return SavedFilters;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SavedFilters);

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/TooltipFilter.css":
/*!*************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/TooltipFilter.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/TooltipFilter.js":
/*!************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/TooltipFilter.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _TooltipFilter_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TooltipFilter.css */ "./src/components/Filter/components/SavedFilters/TooltipFilter.css");
/* harmony import */ var _TooltipFilter_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_TooltipFilter_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_9__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Filter/components/SavedFilters/TooltipFilter.js";






var TooltipFilter =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(TooltipFilter, _Component);

  function TooltipFilter() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, TooltipFilter);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(TooltipFilter).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(TooltipFilter, [{
    key: "formatName",
    value: function formatName(name) {
      switch (name) {
        case 'chemicalName':
          return 'Chemical name';

        case 'quantityFrom':
          return 'Quantity From';

        case 'quantityTo':
          return 'Quantity To';

        case 'priceFrom':
          return 'Price from';

        case 'priceTo':
          return 'Price to';

        case 'distanceLimit':
          return 'Distance limit';

        case 'container':
          return 'Container';

        case 'grade':
          return 'Grade';

        case 'form':
          return 'Form';

        case 'condition':
          return 'Condition';

        case 'origin':
          return 'Origin';

        case 'manufacturer':
          return 'Manufacturer';

        case 'zip':
          return 'ZIP';

        default:
          return name;
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent(content) {
      var _this = this;

      var inside = content.map(function (item, index) {
        var value = item.value;
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("tr", {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }, _this.formatName(item.name)), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("td", {
          className: "tooltip-data",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          },
          __self: this
        }, value));
      });
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("table", {
        className: "tooltip-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("tbody", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("th", {
        colSpan: "2",
        className: "tooltip-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, "FILTERS APPLIED")), inside));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selected = _this$props.selected,
          name = _this$props.name,
          isVisible = _this$props.isVisible,
          content = _this$props.content;
      var bold = selected ? 'tooltipBold' : '';
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: 'tooltipFilter-component',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: bold,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_9__["FormattedMessage"], {
        id: "filter.selectedFilter",
        defaultMessage: "SELECTED FILTER - ",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }) : null, name), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()({
          show: isVisible
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, this.renderContent(content)));
    }
  }]);

  return TooltipFilter;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

TooltipFilter.propTypes = {
  content: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.array,
  className: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (TooltipFilter);

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/actions/SaveFilterItem.actions.js":
/*!*****************************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/actions/SaveFilterItem.actions.js ***!
  \*****************************************************************************************/
/*! exports provided: display */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "display", function() { return display; });
/* harmony import */ var _constants_SaveFilterItem_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/SaveFilterItem.constants */ "./src/components/Filter/components/SavedFilters/constants/SaveFilterItem.constants.js");

var display = function display(element, key) {
  return {
    type: _constants_SaveFilterItem_constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_ELEMENT"],
    payload: element,
    key: key
  };
};

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/constants/SaveFilterItem.constants.js":
/*!*********************************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/constants/SaveFilterItem.constants.js ***!
  \*********************************************************************************************/
/*! exports provided: CHANGE_ELEMENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_ELEMENT", function() { return CHANGE_ELEMENT; });
var CHANGE_ELEMENT = 'CHANGE_ELEMENT';

/***/ }),

/***/ "./src/components/Filter/filter.css":
/*!******************************************!*\
  !*** ./src/components/Filter/filter.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/Filter/index.js":
/*!****************************************!*\
  !*** ./src/components/Filter/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./src/components/Filter/Filter.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/filter */ "./src/modules/filter.js");
/* harmony import */ var _modules_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/products */ "./src/modules/products.js");
/* harmony import */ var _modules_location__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/location */ "./src/modules/location.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/functions */ "./src/utils/functions.js");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_7__);









function mapStateToProps(store) {
  return {
    isOpen: store.filter.isOpen,
    packagingTypes: store.products.packagingTypes,
    warehouseDistances: store.location.warehouseDistances,
    filterGroupStatus: store.filter.filterGroup,
    filterData: store.forms.filter,
    productConditions: store.products.productConditions,
    productForms: store.products.productForms,
    productAge: store.products.productAge,
    productAgeModel: store.forms.filter.productAge,
    productGradeTypes: store.products.productGrade,
    productAgeCustomModel: store.forms.filter.productAgeCustom,
    location: store.products.location,
    saveFilters: store.filter.saveFilters
  };
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    toggleFilterGroup: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["toggleFilterGroup"],
    addFilterTag: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["addFilterTag"],
    toggleFilter: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["toggleFilter"],
    fetchProductAge: _modules_products__WEBPACK_IMPORTED_MODULE_4__["fetchProductAge"],
    resetForm: _utils_functions__WEBPACK_IMPORTED_MODULE_6__["resetForm"],
    fetchProductConditions: _modules_products__WEBPACK_IMPORTED_MODULE_4__["fetchProductConditions"],
    fetchProductGrade: _modules_products__WEBPACK_IMPORTED_MODULE_4__["fetchProductGrade"],
    fetchProductForms: _modules_products__WEBPACK_IMPORTED_MODULE_4__["fetchProductForms"],
    fetchPackagingTypes: _modules_products__WEBPACK_IMPORTED_MODULE_4__["fetchPackagingTypes"],
    fetchWarehouseDistances: _modules_location__WEBPACK_IMPORTED_MODULE_5__["fetchWarehouseDistances"],
    fetchSavedFilters: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["fetchSavedFilters"],
    fillFilter: function fillFilter(values) {
      return react_redux_form__WEBPACK_IMPORTED_MODULE_7__["actions"].merge('forms.filter', values);
    },
    deleteSaveFilter: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["deleteSaveFilter"],
    saveSaveFilter: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["saveSaveFilter"],
    dispatch: dispatch
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_Filter__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ }),

/***/ "./src/components/Radio/Radio.js":
/*!***************************************!*\
  !*** ./src/components/Radio/Radio.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _radioButton_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./radioButton.css */ "./src/components/Radio/radioButton.css");
/* harmony import */ var _radioButton_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_radioButton_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_10__);







var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Radio/Radio.js";





var Radio =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Radio, _Component);

  function Radio() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Radio);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Radio)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)), "state", {});

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)), "handleChange", function (event) {
      var value = event.target.value;

      _this.setState({
        checked: value
      }, function () {
        if (_this.props.onChange) _this.props.onChange(value);
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Radio, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var checked = this.props.redux ? this.props.value : this.props.checked;
      this.setState({
        checked: checked
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var checked = nextProps.redux ? nextProps.value : nextProps.checked;
      this.setState({
        checked: checked
      });
    }
  }, {
    key: "renderRadio",
    value: function renderRadio(opt) {
      var _this2 = this;

      return opt.map(function (radio, index) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", {
          className: "radioButton",
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        }, radio.label), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
          type: "radio",
          onChange: _this2.handleChange,
          name: _this2.props.name,
          value: radio.value,
          checked: radio.value === _this2.state.checked,
          disabled: _this2.props.disabled,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
          className: "radiomark " + (_this2.props.className || '') + (_this2.props.disabled ? ' disabled' : ''),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: this
        }, " "));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var custom = null;

      if (this.state.checked === "10000") {
        custom = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_10__["Control"].text, {
          type: "text",
          model: "form.filter.data.productAgeCustom",
          placeholder: "months",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: this
        }));
      } else if (this.props.productAgeCustomModel != null) {
        this.props.handleCustom("form.filter.data.productAgeCustom", null);
      }

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, this.renderRadio(this.props.opns), custom);
    }
  }]);

  return Radio;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

Radio.propTypes = {
  opns: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.shape({
    value: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool]),
    label: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string
  })).isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.PropTypes.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool]),
  className: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Radio);

/***/ }),

/***/ "./src/components/Radio/RadioRedux.js":
/*!********************************************!*\
  !*** ./src/components/Radio/RadioRedux.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Radio */ "./src/components/Radio/Radio.js");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_9__);






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Radio/RadioRedux.js";






var RadioRedux =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(RadioRedux, _Component);

  function RadioRedux() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, RadioRedux);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(RadioRedux).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(RadioRedux, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          model = _this$props.model,
          dispatch = _this$props.dispatch;
      dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_9__["actions"].change(model, value));
      if (this.props.onChange) this.props.onChange(value);
    }
  }, {
    key: "handleCustom",
    value: function handleCustom(model, value) {
      this.props.dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_9__["actions"].change(model, value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_redux_form__WEBPACK_IMPORTED_MODULE_9__["Control"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        model: this.props.model,
        component: _Radio__WEBPACK_IMPORTED_MODULE_8__["default"],
        redux: true,
        onChange: function onChange(value) {
          return _this.handleChange(value);
        },
        productAgeModel: this.props.productAgeModel,
        productAgeCustomModel: this.props.productAgeCustomModel
      }, this.props, {
        handleCustom: function handleCustom(model) {
          return _this.handleCustom(model);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      }));
    }
  }]);

  return RadioRedux;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

_Radio__WEBPACK_IMPORTED_MODULE_8__["default"].propTypes = {
  opns: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
  })).isRequired,
  currentValue: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  model: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (RadioRedux);

/***/ }),

/***/ "./src/components/Radio/radioButton.css":
/*!**********************************************!*\
  !*** ./src/components/Radio/radioButton.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/Spinner/Spinner.js":
/*!*******************************************!*\
  !*** ./src/components/Spinner/Spinner.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _spinner_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./spinner.css */ "./src/components/Spinner/spinner.css");
/* harmony import */ var _spinner_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_spinner_css__WEBPACK_IMPORTED_MODULE_6__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Spinner/Spinner.js";



var Spinner =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Spinner, _Component);

  function Spinner() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Spinner);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Spinner).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Spinner, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "spinner",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "bounce1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "bounce2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "bounce3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      }));
    }
  }]);

  return Spinner;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Spinner);

/***/ }),

/***/ "./src/components/Spinner/spinner.css":
/*!********************************************!*\
  !*** ./src/components/Spinner/spinner.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/components/SubMenu/SubMenu.js":
/*!*******************************************!*\
  !*** ./src/components/SubMenu/SubMenu.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _submenu_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./submenu.css */ "./src/components/SubMenu/submenu.css");
/* harmony import */ var _submenu_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_submenu_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _images_subMenu_filter_icon_transparent_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../images/subMenu/filter-icon-transparent.png */ "./src/images/subMenu/filter-icon-transparent.png");
/* harmony import */ var _images_subMenu_filter_icon_transparent_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_subMenu_filter_icon_transparent_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _images_subMenu_filter_icon_transparent_active_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../images/subMenu/filter-icon-transparent-active.png */ "./src/images/subMenu/filter-icon-transparent-active.png");
/* harmony import */ var _images_subMenu_filter_icon_transparent_active_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_subMenu_filter_icon_transparent_active_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/SubMenu/SubMenu.js";







var SubMenu =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(SubMenu, _Component);

  function SubMenu(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SubMenu);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(SubMenu).call(this, props));
    _this.state = {
      searchOpen: false,
      filterOpen: false
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SubMenu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        filterOpen: nextProps.filterOpen
      });
    }
  }, {
    key: "renderFilterButton",
    value: function renderFilterButton() {
      var _this2 = this;

      var filterIcon = this.props.filterOpen ? _images_subMenu_filter_icon_transparent_active_png__WEBPACK_IMPORTED_MODULE_9___default.a : _images_subMenu_filter_icon_transparent_png__WEBPACK_IMPORTED_MODULE_8___default.a;
      var filterClass = this.props.filterOpen ? 'opened' : 'closed';
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_10___default()('submenu-filter', filterClass),
        onClick: function onClick() {
          return _this2.props.toggleFilter();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        src: filterIcon,
        alt: "open filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }), "Filters");
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "submenu",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, this.renderFilterButton());
    }
  }]);

  return SubMenu;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

SubMenu.propTypes = {
  links: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.shape({
    label: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    url: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    class: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    exact: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool
  })),
  search: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  filter: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (SubMenu);

/***/ }),

/***/ "./src/components/SubMenu/index.js":
/*!*****************************************!*\
  !*** ./src/components/SubMenu/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SubMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubMenu */ "./src/components/SubMenu/SubMenu.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/filter */ "./src/modules/filter.js");





function mapStateToProps(store) {
  return {
    filterOpen: store.filter.isOpen
  };
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    toggleFilter: _modules_filter__WEBPACK_IMPORTED_MODULE_3__["toggleFilter"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_SubMenu__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ }),

/***/ "./src/components/SubMenu/submenu.css":
/*!********************************************!*\
  !*** ./src/components/SubMenu/submenu.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/constants/locations.js":
/*!************************************!*\
  !*** ./src/constants/locations.js ***!
  \************************************/
/*! exports provided: REGIONS_FETCH_REQUESTED, REGIONS_FETCH_FAILED, REGIONS_FETCH_SUCCEEDED, STATES_FETCH_REQUESTED, STATES_FETCH_FAILED, STATES_FETCH_SUCCEEDED, STATEDETAIL_FETCH_REQUESTED, STATEDETAIL_FETCH_FAILED, STATEDETAIL_FETCH_SUCCEEDED, REGIONDETAIL_FETCH_REQUESTED, REGIONDETAIL_FETCH_FAILED, REGIONDETAIL_FETCH_SUCCEEDED, PROVINCES_FETCH_REQUESTED, PROVINCES_FETCH_FAILED, PROVINCES_FETCH_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONS_FETCH_REQUESTED", function() { return REGIONS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONS_FETCH_FAILED", function() { return REGIONS_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONS_FETCH_SUCCEEDED", function() { return REGIONS_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES_FETCH_REQUESTED", function() { return STATES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES_FETCH_FAILED", function() { return STATES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES_FETCH_SUCCEEDED", function() { return STATES_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATEDETAIL_FETCH_REQUESTED", function() { return STATEDETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATEDETAIL_FETCH_FAILED", function() { return STATEDETAIL_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATEDETAIL_FETCH_SUCCEEDED", function() { return STATEDETAIL_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONDETAIL_FETCH_REQUESTED", function() { return REGIONDETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONDETAIL_FETCH_FAILED", function() { return REGIONDETAIL_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONDETAIL_FETCH_SUCCEEDED", function() { return REGIONDETAIL_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCES_FETCH_REQUESTED", function() { return PROVINCES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCES_FETCH_FAILED", function() { return PROVINCES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCES_FETCH_SUCCEEDED", function() { return PROVINCES_FETCH_SUCCEEDED; });
var REGIONS_FETCH_REQUESTED = 'REGIONS_FETCH_REQUESTED';
var REGIONS_FETCH_FAILED = 'REGIONS_FETCH_FAILED';
var REGIONS_FETCH_SUCCEEDED = 'REGIONS_FETCH_SUCCEEDED';
var STATES_FETCH_REQUESTED = 'STATES_FETCH_REQUESTED';
var STATES_FETCH_FAILED = 'STATES_FETCH_FAILED';
var STATES_FETCH_SUCCEEDED = 'STATES_FETCH_SUCCEEDED';
var STATEDETAIL_FETCH_REQUESTED = 'STATEDETAIL_FETCH_REQUESTED';
var STATEDETAIL_FETCH_FAILED = 'STATEDETAIL_FETCH_FAILED';
var STATEDETAIL_FETCH_SUCCEEDED = 'STATEDETAIL_FETCH_SUCCEEDED';
var REGIONDETAIL_FETCH_REQUESTED = 'REGIONDETAIL_FETCH_REQUESTED';
var REGIONDETAIL_FETCH_FAILED = 'REGIONDETAIL_FETCH_FAILED';
var REGIONDETAIL_FETCH_SUCCEEDED = 'REGIONDETAIL_FETCH_SUCCEEDED';
var PROVINCES_FETCH_REQUESTED = 'PROVINCES_FETCH_REQUESTED';
var PROVINCES_FETCH_FAILED = 'PROVINCES_FETCH_FAILED';
var PROVINCES_FETCH_SUCCEEDED = 'PROVINCES_FETCH_SUCCEEDED';

/***/ }),

/***/ "./src/helpers/Orders.js":
/*!*******************************!*\
  !*** ./src/helpers/Orders.js ***!
  \*******************************/
/*! exports provided: getOrderStatus, getShippingStatus, getReviewStatus, getPaymentStatus, getCreditStatus, getReturnStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrderStatus", function() { return getOrderStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShippingStatus", function() { return getShippingStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReviewStatus", function() { return getReviewStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPaymentStatus", function() { return getPaymentStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCreditStatus", function() { return getCreditStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReturnStatus", function() { return getReturnStatus; });
function getOrderStatus(orderStatus) {
  switch (orderStatus) {
    case 1:
      return 'Pending';

    case 2:
      return 'Confirmed';

    case 3:
      return 'Rejected';

    default:
      return 'N/A';
  }
}
function getShippingStatus(shippingStatus) {
  switch (shippingStatus) {
    case 1:
      return 'Not Shipped';

    case 2:
      return 'In Transit';

    case 3:
      return 'Delivered';

    case 4:
      return 'Returned';

    default:
      return 'N/A';
  }
}
function getReviewStatus(reviewStatus) {
  switch (reviewStatus) {
    case 1:
      return 'Pending';

    case 2:
      return 'Accepted';

    case 3:
      return 'Rejected';

    default:
      return 'N/A';
  }
}
function getPaymentStatus(paymentStatus) {
  switch (paymentStatus) {
    case 1:
      return 'Escrow';

    case 2:
      return 'Paid';

    case 3:
      return 'Refunded';

    default:
      return 'N/A';
  }
}
function getCreditStatus(creditStatus) {
  switch (creditStatus) {
    case 1:
      return 'Pending';

    case 2:
      return 'Counter Offer Pending';

    case 3:
      return 'Accepted';

    case 4:
      return 'Rejected';

    default:
      return 'N/A';
  }
}
function getReturnStatus(returnStatus) {
  switch (returnStatus) {
    case 1:
      return 'In Transit';

    case 2:
      return 'Delivered';

    default:
      return 'N/A';
  }
}

/***/ }),

/***/ "./src/images/bell.png":
/*!*****************************!*\
  !*** ./src/images/bell.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAbCAYAAAB4Kn/lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAPnAAAD5wHDtfxxAAAAB3RJTUUH4wEXCxgRSFTSUAAAAwNJREFUSMetljtsHFUUhr//3ju7k7X34X3grM3DYSNFVDSJBEZKBQWiQSABIk6BSBAVEkKKgIoqTaRQ8KiRwNBSpERUdIgiElTYFkgkVMEOZG283r2HYh8eJ+s4u+KXjjRz59x/zv3PfzQj7oP2agtgBngPeBEQ8B1wGdicObd+6F53KOlXreHleeAM8A7wFtAELhIsm/PgxAiAWeAF4BPgB+BH4AqwTFfVQc5YhHsq/fIELskR9zpzwNNILeB54OygEAFLmJ0Fvt/+4pG/LSTMrGyMqeugpilmr+L9RR0rnKJQKCqfB+9yAPRix3Z3YXv7ju1sX6fb/VTeXTNjL6u5sqSSEovxfRVmLrmHF4+pXIEQHFI21zCDbjfa7S2LN27ctnb7I4f/zIhWWFnf13jn634TLMbnSNN3XauVqt7whOABYSbMGIQAEYJXvRHc462y0vRStO4Zy5zfAcT+SgBed/V6UcWix4wjYYaKRa96Yx5pRR3T0ClueDqiNQnhtCqVe7Q/AlKl4gjhKQs2ckrGbvaokuQh5VM9ULXZqvN5Kck1MTt+QIoB5gkhwfsJWAcI3khCCtTGEc/ifYJzk8gwEMMJ71OgNHpX5nGKlJuYtA+PlADJOGLHwLBTQYrZ26wUvalJ9zHqz/9NPK5ii9PTAHbQ+xliDcknt1uf2ZMZLNdebQ2pFnBuOs4hg6gC7HxzcjTSS4TwiqvV4lQ+dk6qVsEnrxFjLUbDySTgTZUrT2iuOtk4j+o1XK3uNFdZBs7FGHFGXCZJzrtmU3jvp9UC771bWEhI07cdPOmAD1ytPq9SSZhFYBi9uyIeEv3nZj3NFuUajcdw7sOA3DP27471Njb2soaQYewv9AwThgZ9H377DuYJrNMR0rMB7IJtbZ3ELMf+iHvrb47AcZXKL6lcKoCwO/9E29y8BvwCuLs6Ykg9pPX7OqC92oLd3aYWF7/1SydO45zF33/7I968+TLe/zTVD8sQhTc+/9P+2rzaW1v7ubf261q8detj6+5dP2qO/gNbEQ0wfZUMtgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMS0yM1QxMToyNDoxNy0wNTowMAeQtRUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMjNUMTE6MjQ6MTctMDU6MDB2zQ2pAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/images/bell_transparent.png":
/*!*****************************************!*\
  !*** ./src/images/bell_transparent.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAbCAYAAAB4Kn/lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAPnAAAD5wHDtfxxAAAAB3RJTUUH4wEXCwsun92+/wAAAptJREFUSMed1k9oXFUUx/HPeW9iK/6jsQtbhOrChQv/bApicS2lCgqCiP9WFSx2MmkxKa5cKUmEpNNdF+7ElYIuWhVFii4EcaHgym5ERQqCNIg2mbx3Xdw3yYTJTDo58B689+793nPOPe93bhhj7dk5uA1n8QwCX+Id/N1dXhw5t9gFCi/jKNp4DYdwsioLM503Jwc3djtO4AK+xfdYxONlVU+niJETh77MnJm3r9Vyo9c7gGNYasL/p3GkwJN4G1+JdF0qdJcXRoOb8PfjBbzaQH7F77jejL8T9+II/sNFfIreYM43we0zczAleQvPYgWX8FekVJ9fWcoRdeakiIJ0EMdxCh+QLiB1l5e2wKdnzwk1PNXk8HXJlYjkfDNwaHM780SNeALvYQbf9b0u8q0WtPAiLqWpdEUYCYXuygJCVVXf4Gu8pC6j3ZnfAqd8HcaD+Cx6YVyNbsKXF5VlCV/gIUU1LdJQuR1pnq/uShy2q5iSnRsC34N/m92f1FblCjm4E/iOBry2B/CNBnzXTuD9WE9spAmpQYX1Jh3IlTC4SBV5LyeBkudUg+8HwdXN47Ys9d2IfnENp2JP4IhNr7fJw6DHNYoU/UqcDJ7GgJtVU0zA7McfKAe9bp3eEvTD6EWakLyNbxre6JxTNJD78DQ+ItZ3kOndbAOfy6p4dxG1QlWE3HKu4WPclE70bWDsh/JP8goUyvqYLJddrO4lD42tyhr+HB6N9uzcZfwhxSnrt/SUI6qutUFZjV+2LkKKd3F/C4/hJ5Eu2rc2qrlWCFXWSLn+d1qklrv4wy2cxAOyVrRsL51aVr3ncevA5E/ws+Eun2QJfX9saE1zPYTLeKR5fU0+EvywpwMLhNBLa39iAb/gN7kn/rjLRvof7ErHhk8RStoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDEtMjNUMTE6MTE6NDYtMDU6MDCWzB2AAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTIzVDExOjExOjQ2LTA1OjAw55GlPAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/images/inv-filter/dropdown-close.png":
/*!**************************************************!*\
  !*** ./src/images/inv-filter/dropdown-close.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpiYiAOxANxIjaJ////o2BiDfsLxYmUGggz7D8UYxhKioGxSIY9hGIMQ4k1EN0wOSjGMJQYA7EZBgPohsYTMhCfYUQZSqphBA2FgXASDMNrKAj4A/FPEg3DaShIcA2ZhmEzdB5IgA2IZ5FpGCzcQHq7gJgJIMAA5zSaFCxVgVMAAAAASUVORK5CYII="

/***/ }),

/***/ "./src/images/inv-filter/dropdown.png":
/*!********************************************!*\
  !*** ./src/images/inv-filter/dropdown.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALxJREFUeNpiVJ15lYmBgaEDiKcA8SMGEsGtNC0GtVnX5IDMGiDOYQESc4A4EYjDgdiWVEOhhh0GYhAtBHLdQSD+BxWASRALkPX8AuLFIAMXAnESGYYiqwXpjQF6fyMTVJJUQ9ENSwAathokwYSkiFhDsRm2GCbJhKaYkKF4DQMBFiwuWAil5yEZYAsVQzEMFAnomllwhBE2QxkIGYbPQGyGMhAyjJCB6IYyQMN3MT4NLESkt4U42FgBQIABANkUQE1VEyGLAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/images/remove.png":
/*!*******************************!*\
  !*** ./src/images/remove.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAQAAAAn3TzeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjARcLJA0vpvfgAAAA9ElEQVQ4y+3SMU7DQBCF4f/FgNI5FQWFpeAyOUF6UtPmFgFXlBRIcIckZ0gKbkAbSiT6dOmRImW1FNiLbcbGLRJTrbz+dlb7Bv6rVlGxEEqEDtZPQuhCfX0UX3ql3Ql3xDIQkHLP0D7xTHM9qgaFUKqVrvMDTHhThULosgUFeKunAuZo2YrqsDMKMMvhUAsbRQZ0bBkzZU/Gs18L/1uv0PFUD3rXTA3X61kISDjnhRFxt0alnOwcm1HI6WeObSg8eSdo5VQfABsZOZVzbOpkhhvg4HsnKj36FW9+Y4UrxyspR3aVkPLFCQ5vT4S+GriO8/Kn6xPMfDItV7JeMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMS0yM1QxMTozNjoxMy0wNTowMDaknvsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMjNUMTE6MzY6MTMtMDU6MDBH+SZHAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/images/subMenu/filter-icon-transparent-active.png":
/*!***************************************************************!*\
  !*** ./src/images/subMenu/filter-icon-transparent-active.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABcCAYAAADqBHIiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+1JREFUeNrsnc9LVFEUx+9MY1C7IGtaFOIMiES00SAwgkAoFKFVK8UIWjUuauWmRRS0scW4C6LBNgWtokgK2mQE2T8woOgiQUEyaqc20/fGyx+Tje/HPdfbu98DjwsO3vPeZ77vet/5znEy9XpdMeQiJzl5JpP5r+GYEF8uAbw8hpdbfrSIE+oXvN6/8uEQzYdrTHx9Wd7EskHABEzADAImYAJmEDABEzCDgAmYQcA2I3I1rTj++SyGnvaxD5fXlr907j/WfrC+tlpbX1n8gdde47XnOKZmSl1V4lUqE7bmCXg9GK7hGA459x0cldmR7jlD52q9XKkMlGOzIeEOYngfAa6O2zg+FcrTfVyDm8MdwzARc/7DWgWAPEjAO8PVir1pIM8EIF8k4O1wL2B4bDBXBZDzBLwZ1w3nOhpxDU8vYKi3F8MVgXx3oeIOKlipAaF8+/QemoCVkvyD1EvASrUJ5ix6DRjr7yEl+4mfViqYIQd4ptS1gmFdMOdXKlipecGcVQJWalIw51sCVuqFYM4p7wFjHdYqeyaQb3R2pJtLRBAPDedawvHE+13EFhW/w3DVYK5hqHfBN8C7WkZBwT1pTXgIcJOq14plVChP//Yc62ur2nM8vdVzbDly4qOK6DmG8uQCyyiOq7EcKPeVgWsXBQywsTxHgJ5L/CSHSbT6zukJI5zzPRxnDMEVjcDSiuU5Qnx9iRXcoGb9Tp/HbTOw/m3pVEvr8QOqVqvjdvreeAsZ7jISUTDgGlkCAxEmB7zxiyG6jFwHDLhasaZssUuAPBlriUhjAK5xzxF3d56AN8OK55j1VL1iniNU3EEFW/QcfQVszXP0FXCb4NxFrwFj/bXqOdKTEw7vAOPR3arn6KuC5wXnrhKwRc8x5zqJhvpsZ0N9dqMnJKIVpT3HG0KnvM1zdLbYE7c+G7YnBPM/FXiaG50pdd13folIUp+N0BNixXPMOgjXSk8IlG7cc4R6F5wGHNRnrfWEAHIFwwMD+YZ2qgU7BViiPhumJwSQb2lAMXNoz7H/X26Gawres56QwPGO5TkCblPP0YldRFCffSPwpv3EcTLKFi7YvYTyHMPM58o+WLo+Gxow3oypYC/7SNlqpbUQqe0JcQVwm+DcRa8B267P+qrg1MaeA7Zdn/VVwfOCc1cJOMU9Ia4ATm1PiBOAsQ6ntifEpV1EKntCnAEsUZ91oSfEqX2wyfos5pp04Zqce9AwUZ810HCT7ie5JPVZ13pCnLXt/5QNC+VpXTbctT7ragep85+LaFafVbL/WjG9S0SagoAJmIAZBEzABMwgYAImYAYBEzCDgG1GRvKbwfnF1VSwePwSYABEnbgk6/WDygAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/images/subMenu/filter-icon-transparent.png":
/*!********************************************************!*\
  !*** ./src/images/subMenu/filter-icon-transparent.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABcCAYAAADqBHIiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABbFJREFUeNrsnW2IFVUYx8/UliCiH4QIQYQlgogWWZIgxK0+SCSWhNBW9kVE8IUQhZRe2ZSChC2CCiIsKssPJb3IEn3oDVmSBVmCJdBlKQIRIaSQoKJu/6f7TJ0999zZuTPn3HN2zvPAn8vM3J259zdnnjnn+c+5m7VaLSXhLwbq7iDLsqQBLtRAB2qAXYaXr7RVV6A7PH6XRXm8q+Qi9hsCWAALYAkBLIAFsIQAFsACWEIAL7boqRaRZRmdkBFoGFprbF4KvQ5NQ1MsAVwS7BK8PMhaWXA1DLO2Q+egd6EJSRHFcIfw8h60twCuLW6EnoVehq4TwHa4m/HyBrSmy1t+h45D3xXs5nboBHSTpIj5cLfi5ZBl00W+7L+GZrT1V0O3QrdB24yTtxx6Ddpj/E2agAGXbmCPWTa9DR1T7eKzGX9BZ1inoB3QRm07FbDHoVHocrIpgp2KI8a2P7V8eqXEfuegxzl360E5/JnUczD1FK431h2GPqmw/3HuSeixHlqXJGC03qUMWI83a3a1XoK+MNZtT7UFb+AbUh4/cS+ibnxoLFMLXp0i4PXG8qfcFasbZ3hfRcdKAvCwsfyNw2NNG8u3JAWYh8P6iOsPaNbhsc4by8mliBXGtl8cH8vs3i2TWoTfY/2dGmCzxa5wfKzlnq+QuAG3Wi3qLVzQtl2r2hUxV2Hu68cUU8SksTzi8Fj3GMszKQI+ayzf5+hmRH3eISP/nk4RMJUg9UoX1SQedXAcc/j9rWqXPdMCzHn4uPGe+6GHahzjSdWuEetxLGIed0IHVLt+rUfuOe5WPRSrMvMJbR5wvAMNGu99tQKYMWiTZfg9VuHL+3wAu4znaMa/niP4TfQEmCEPMuQlxqaPVLvGO1ci5z5sOdPUc3gE+i0iwHRvoBr1mop/Tx2DI+B4qTRghkyXynPQNZYBwkmuLdDOf+X1K/nyIjfkbssu6QPsqtE98wGYPMenCgZclDI/4LrJUMF+iMEesPy+NGCGTIblUUtL1uNzvhkWfQC6oe00+tmhAbv0HPPPQ5BnSgNmyHTpPKE6K21l42PoRVXOauoX4LV8wzIhFXmOelAKNT1Hip+hUTC9XBqwBpoGCg9AN5f8EtTPfUt1lilDA6b9nFDzbTHyHJ9Xvdti+y09rNNgui9fKP3oFN8tJwD6BtV+1oFawQYjN38JUR76LOJ+bjfPsYotNs7fe5t+gwejdeA11RNgDTTViGexk5NGi6KewcHI+/2+PMdV0F3aOvIcp5RK7+nKvnmOaICrUwTsxXPEVd3Vc0wNcN89x5QAB/EcUwIcxHOUKQTuwuo5pgQ4iOc4sAhahas5IbnnuIqXc8/xnKPPavUcYwXsa07IJBd58hhxCNjqOcaYInzOCfHiOWJQ0dVzjA2w7zkhffMcMfi4GFuK6MeckPwE7dXWkef4g+p8Gr9sFHqOWdWf9XL8o0he67NGq/XuOYLpWEyAvddnoX2WE+LNcwTT/zzHGFKE9/osg9C7cXN8aZue4xboXlXdc9yvw42hBVNf9pTRSaf67Cs1T9oLan59luDu6nJDdOY5guWFhYZ3/Y7Qc0ImOaWcLdjXxgXgkuc4aoMbA+AY5oRQ3iTH+2nV2wOJlNt3AOxhqOtNOHQO9l2f3awtU332/YL3T7Cceo4hAcc6J2SW5cRzDJkikpgT0uRyZRRzQkICTmJOSEjAScwJCZ0iGj8nJDTgxs8JCQ248XNCQgNu/JyQGLppNLoyy4NUdqzyox1Uh91iGX5PpwyYWvEhSw1iN7fGwZI5lxyMTZaew9GQXy4Wy8hbfVZVm3DTOMAUVEg5oDrrs3SVbVX/2+39mhPSyKGys/psDHBja8F63tzJA4WQc0IaCzgPL/VZAdwZTuuzqefgxoUAFsACWEIAC2ABLCGABbAAlhDAiy2yuv8ZXP5xtad/XF32AKnHPwIMAJZo4KTdRKdxAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/modules/filter.js":
/*!*******************************!*\
  !*** ./src/modules/filter.js ***!
  \*******************************/
/*! exports provided: initialState, default, toggleFilter, toggleFilterGroup, addFilterTag, closeFilterTag, resetFilterTags, fetchSavedFilters, deleteSaveFilter, saveSaveFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleFilter", function() { return toggleFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleFilterGroup", function() { return toggleFilterGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFilterTag", function() { return addFilterTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeFilterTag", function() { return closeFilterTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFilterTags", function() { return resetFilterTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSavedFilters", function() { return fetchSavedFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSaveFilter", function() { return deleteSaveFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSaveFilter", function() { return saveSaveFilter; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);





var RESET_TAGS = "RESET_TAGS";
var TOGGLE_FILTER = "TOGGLE_FILTER";
var TOGGLE_FILTER_GROUP = 'TOGGLE_FILTER_GROUP';
var ADD_FILTER_TAG = 'ADD_FILTER_TAG';
var CLOSE_FILTER_TAG = 'CLOSE_FILTER_TAG';
var CLOSE_FILTER_TAG_FULFILLED = 'CLOSE_FILTER_TAG_FULFILLED';
var GET_SAVE_FILTERS = 'GET_SAVE_FILTERS';
var GET_SAVE_FILTERS_FULFILLED = 'GET_SAVE_FILTERS_FULFILLED';
var DELETE_SAVE_FILTER = 'DELETE_SAVE_FILTER';
var SAVE_SAVE_FILTER = 'SAVE_SAVE_FILTER';
var initialState = {
  isOpen: false,
  data: {},
  filterGroup: {
    orderId: true,
    orderDate: true,
    customer: false,
    product: false,
    orderStatus: false,
    chemName: true,
    quantity: true,
    price: true,
    packaging: false,
    productGrade: false,
    chemSearch: false,
    productAge: false,
    location: false,
    date: false,
    condition: false,
    form: false
  },
  filterTags: [],
  saveFilters: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case TOGGLE_FILTER:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          isOpen: !state.isOpen
        });
      }

    case TOGGLE_FILTER_GROUP:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterGroup: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state.filterGroup, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, action.payload.name, action.payload.value))
        });
      }

    case ADD_FILTER_TAG:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterTags: action.payload
        });
      }

    case CLOSE_FILTER_TAG_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterTags: Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.filterTags.slice(0, action.payload)).concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.filterTags.slice(action.payload + 1)))
        });
      }

    case RESET_TAGS:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterTags: []
        });
      }

    case GET_SAVE_FILTERS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          saveFilters: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function toggleFilter() {
  return {
    type: TOGGLE_FILTER
  };
}
function toggleFilterGroup(name, value) {
  return {
    type: TOGGLE_FILTER_GROUP,
    payload: {
      name: name,
      value: value
    }
  };
}
function addFilterTag(data) {
  return {
    type: ADD_FILTER_TAG,
    payload: data
  };
}
function closeFilterTag(index) {
  return {
    type: CLOSE_FILTER_TAG,
    payload: _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(index)
  };
}
function resetFilterTags() {
  return {
    type: RESET_TAGS
  };
}
function fetchSavedFilters() {
  return {
    type: GET_SAVE_FILTERS,
    payload: axios__WEBPACK_IMPORTED_MODULE_4___default.a.get("/prodex/api/filters").then(function (response) {
      return response.data;
    })
  };
}
function deleteSaveFilter(id) {
  return {
    type: DELETE_SAVE_FILTER,
    payload: axios__WEBPACK_IMPORTED_MODULE_4___default.a.delete("/prodex/api/filters/".concat(id))
  };
}
function saveSaveFilter(inputs) {
  return {
    type: SAVE_SAVE_FILTER,
    payload: axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/prodex/api/filters", inputs)
  };
}

/***/ }),

/***/ "./src/modules/identity.js":
/*!*********************************!*\
  !*** ./src/modules/identity.js ***!
  \*********************************/
/*! exports provided: initialState, default, getIdentity, login, getVersion, logout, registration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIdentity", function() { return getIdentity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersion", function() { return getVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registration", function() { return registration; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qs */ "qs");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/auth */ "./src/utils/auth.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");






var GET_IDENTITY = 'GET_IDENTITY';
var GET_IDENTITY_PENDING = 'GET_IDENTITY_PENDING';
var GET_IDENTITY_FULFILLED = 'GET_IDENTITY_FULFILLED';
var GET_IDENTITY_REJECTED = 'GET_IDENTITY_REJECTED';
var LOGIN = 'LOGIN';
var LOGIN_PENDING = 'LOGIN_PENDING';
var LOGIN_REJECTED = 'LOGIN_REJECTED';
var LOGIN_FULFILLED = 'LOGIN_FULFILLED';
var LOGOUT = 'LOGOUT';
var GET_VERSION = 'GET_VERSION';
var GET_VERSION_FULFILLED = 'GET_VERSION_FULFILLED';
var REGISTRATION = 'REGISTRATION';
var REGISTRATION_PENDING = 'REGISTRATION_PENDING';
var REGISTRATION_REJECTED = 'REGISTRATION_REJECTED';
var REGISTRATION_FULFILLED = 'REGISTRATION_FULFILLED';
var initialState = {
  isAuthenticated: false,
  identity: {
    isFetching: false,
    data: {
      role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
    }
  },
  loginForm: {
    isFetching: false,
    hasError: false,
    isValid: false,
    data: {
      email: "",
      password: "",
      role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
    }
  },
  registrationForm: {
    isFetching: false,
    hasError: false,
    isValid: false,
    data: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: ""
    }
  },
  version: "0"
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case GET_IDENTITY_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isAuthenticated: false,
          identity: {
            isFetching: true,
            data: {
              role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
            }
          }
        });
      }

    case GET_IDENTITY_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isAuthenticated: true,
          identity: {
            isFetching: false,
            data: action.payload
          }
        });
      }

    case GET_IDENTITY_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isAuthenticated: false,
          identity: {
            isFetching: false,
            data: {
              role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
            }
          }
        });
      }

    case LOGIN_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          loginForm: {
            isFetching: true,
            hasError: false,
            isValid: false
          }
        });
      }

    case LOGIN_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          loginForm: {
            isFetching: false,
            hasError: true,
            isValid: false
          }
        });
      }

    case LOGIN_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          loginForm: {
            isFetching: false,
            hasError: false,
            isValid: true
          }
        });
      }

    case REGISTRATION_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          registrationForm: {
            isFetching: true,
            hasError: false,
            isValid: false
          }
        });
      }

    case REGISTRATION_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          registrationForm: {
            isFetching: false,
            hasError: true,
            isValid: false
          }
        });
      }

    case REGISTRATION_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          registrationForm: {
            isFetching: false,
            hasError: false,
            isValid: true
          }
        });
      }

    case LOGOUT:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          identity: initialState.identity,
          isAuthenticated: false
        });
      }

    case GET_VERSION_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          version: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function getIdentity() {
  return {
    type: GET_IDENTITY,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/users/me").then(function (response) {
      return response.data;
    }).catch(function (e) {
      Object(_utils_auth__WEBPACK_IMPORTED_MODULE_3__["deleteAuthToken"])();
      throw e;
    })
  };
}
function login(username, password) {
  var grant_type = "password";
  return {
    type: LOGIN,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/prodex/oauth/token", qs__WEBPACK_IMPORTED_MODULE_2___default.a.stringify({
      grant_type: grant_type,
      username: username,
      password: password
    }), {
      headers: {
        'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs'
      }
    }).then(function (response) {
      return Object(_utils_auth__WEBPACK_IMPORTED_MODULE_3__["setAuthToken"])(response.data.access_token);
    })
  };
}
function getVersion() {
  return {
    type: GET_VERSION,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/version").then(function (result) {
      return result.data.version;
    })
  };
}
function logout() {
  Object(_utils_auth__WEBPACK_IMPORTED_MODULE_3__["deleteAuthToken"])();
  return {
    type: LOGOUT
  };
}
function registration(email, password, firstName, middleName, lastName) {
  return {
    type: REGISTRATION,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'post',
      url: "/api/users",
      data: {
        email: email,
        password: password,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName
      }
    })
  };
}

/***/ }),

/***/ "./src/modules/location.js":
/*!*********************************!*\
  !*** ./src/modules/location.js ***!
  \*********************************/
/*! exports provided: initialState, default, fetchLocations, fetchFilterLocations, fetchWarehouses, saveWarehouse, updateWarehouse, getRegions, getStates, getStateDetail, fetchWarehouseDistances, getRegionDetail, fetchProvinces */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLocations", function() { return fetchLocations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchFilterLocations", function() { return fetchFilterLocations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWarehouses", function() { return fetchWarehouses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveWarehouse", function() { return saveWarehouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateWarehouse", function() { return updateWarehouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegions", function() { return getRegions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStates", function() { return getStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStateDetail", function() { return getStateDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWarehouseDistances", function() { return fetchWarehouseDistances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegionDetail", function() { return getRegionDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProvinces", function() { return fetchProvinces; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_locations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/locations */ "./src/constants/locations.js");



var FETCH_WAREHOUSE = 'FETCH_WAREHOUSE';
var FETCH_WAREHOUSE_FULFILLED = 'FETCH_WAREHOUSE_FULFILLED';
var FETCH_LOCATIONS = 'FETCH_LOCATIONS';
var FETCH_LOCATIONS_PENDING = 'FETCH_LOCATIONS_PENDING';
var FETCH_LOCATIONS_FULFILLED = 'FETCH_LOCATIONS_FULFILLED';
var FETCH_FILTER_LOCATIONS = 'FETCH_FILTER_LOCATIONS';
var FETCH_FILTER_LOCATIONS_FULFILLED = 'FETCH_FILTER_LOCATIONS_FULFILLED';
var SAVE_WAREHOUSE = 'SAVE_WAREHOUSE';
var UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';
var FETCH_WAREHOUSE_DISTANCES = 'FETCH_WAREHOUSE_DISTANCES';
var initialState = {
  isPending: false,
  isValid: false,
  hasError: false,
  warehouse: [],
  locations: [],
  filterLocations: [],
  regions: [],
  states: [],
  provinces: [],
  stateDetail: {},
  regionDetail: {},
  stateDetailIsFetching: false,
  regionDetailIsFetching: false,
  statesAreFetching: false,
  regionsAreFetching: false,
  isFetching: false,
  warehouseDistances: [],
  //filter location
  locationFetching: false,
  filterLocationsFetching: false,
  data: {}
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_LOCATIONS_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          locationFetching: true,
          locationsFetched: false
        });
      }

    case FETCH_WAREHOUSE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          warehouse: action.payload
        });
      }

    case FETCH_LOCATIONS_FULFILLED:
      {
        var locations = action.payload.map(function (loc) {
          return {
            id: loc.id,
            province: loc.province,
            country: loc.country
          };
        });
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          locationFetching: false,
          locations: locations,
          locationsFetched: action.payload.status
        });
      }

    case FETCH_FILTER_LOCATIONS_FULFILLED:
      {
        var filterLocations = action.payload.map(function (loc) {
          return {
            id: loc.id,
            province: loc.province,
            country: loc.country
          };
        });
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          filterLocationsFetching: false,
          filterLocations: filterLocations,
          filterLocationsFetched: action.payload.status
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          statesAreFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONS_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regionsAreFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATEDETAIL_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          stateDetailIsFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONDETAIL_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regionDetailIsFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONS_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regions: action.payload,
          regionsAreFetching: false
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          states: action.payload,
          statesAreFetching: false
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATEDETAIL_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          stateDetail: action.payload,
          stateDetailIsFetching: false
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONDETAIL_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regionDetail: action.payload,
          regionDetailIsFetching: false
        });
      }

    case FETCH_WAREHOUSE_DISTANCES:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          warehouseDistances: action.payload
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["PROVINCES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          provincesAreFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["PROVINCES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          provinces: action.payload,
          provincesAreFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function fetchLocations() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_LOCATIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/locations', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchFilterLocations() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    type: FETCH_FILTER_LOCATIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/locations', {
      params: {
        search: filter
      }
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchWarehouses() {
  return {
    type: FETCH_WAREHOUSE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/branches/warehouses').then(function (result) {
      return result.data;
    })
  };
}
function saveWarehouse(warehouseName, streetAddress, city, province, name, number, email, zip) {
  var address = {
    streetAddress: streetAddress,
    city: city,
    zip: zip,
    province: province
  };
  var contact = {
    name: name,
    phone: number,
    email: email
  };
  return {
    type: SAVE_WAREHOUSE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/branches', {
      address: address,
      company: 1,
      contact: contact,
      warehouse: true,
      warehouseName: warehouseName
    })
  };
}
function updateWarehouse(id, warehouseName, streetAddress, city, province, name, number, email, zip) {
  var address = {
    streetAddress: streetAddress,
    city: city,
    zip: zip,
    province: province
  };
  var contact = {
    name: name,
    phone: number,
    email: email
  };
  return {
    type: UPDATE_WAREHOUSE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("prodex/api/branches/".concat(id), {
      address: address,
      company: 1,
      contact: contact,
      warehouse: true,
      warehouseName: warehouseName
    })
  };
}
function getRegions() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONS_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}
function getStates() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATES_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}
function getStateDetail(id) {
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATEDETAIL_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function fetchWarehouseDistances() {
  return {
    type: FETCH_WAREHOUSE_DISTANCES,
    payload: [{
      id: 1,
      name: '10'
    }, {
      id: 2,
      name: '100'
    }, {
      id: 3,
      name: '1000'
    }, {
      id: 4,
      name: '10000'
    }]
  };
}
function getRegionDetail(id) {
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONDETAIL_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function fetchProvinces() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["PROVINCES_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}

/***/ }),

/***/ "./src/modules/products.js":
/*!*********************************!*\
  !*** ./src/modules/products.js ***!
  \*********************************/
/*! exports provided: initialState, default, addLotSaveOffering, searchProducts, mapProducts, fetchManufacturer, fetchProductForms, fetchProductConditions, fetchProductGrade, fetchOrigin, fetchProductAge, fetchRecentAddedProducts, saveMapping, setSavedMappingToFalse, fetchAlternativeNames, fetchPackagingTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLotSaveOffering", function() { return addLotSaveOffering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchProducts", function() { return searchProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapProducts", function() { return mapProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchManufacturer", function() { return fetchManufacturer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductForms", function() { return fetchProductForms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductConditions", function() { return fetchProductConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductGrade", function() { return fetchProductGrade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchOrigin", function() { return fetchOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductAge", function() { return fetchProductAge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecentAddedProducts", function() { return fetchRecentAddedProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveMapping", function() { return saveMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSavedMappingToFalse", function() { return setSavedMappingToFalse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAlternativeNames", function() { return fetchAlternativeNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPackagingTypes", function() { return fetchPackagingTypes; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);



var FETCH_PRODUCT_FORMS = 'PRODUCT_FORMS';
var FETCH_PRODUCT_FORMS_FULFILLED = 'PRODUCT_FORMS_FULFILLED';
var FETCH_PRODUCT_CONDITIONS = 'FETCH_PRODUCT_CONDITIONS';
var FETCH_PRODUCT_CONDITIONS_FULFILLED = 'FETCH_PRODUCT_CONDITIONS_FULFILLED';
var FETCH_PRODUCT_GRADE = 'FETCH_PRODUCT_GRADE';
var FETCH_PRODUCT_GRADE_FULFILLED = 'FETCH_PRODUCT_GRADE_FULFILLED';
var FETCH_PRODUCT_AGE = 'FETCH_PRODUCT_AGE';
var FETCH_PRODUCT_AGE_FULFILLED = 'FETCH_PRODUCT_AGE_FULFILLED';
var FETCH_RECEANT_ADDED_PRODUCTS = 'FETCH_RECEANT_ADDED_PRODUCTS';
var FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED = 'FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED';
var FETCH_ORIGIN = 'FETCH_ORIGIN';
var FETCH_ORIGIN_PENDING = 'FETCH_ORIGIN_PENDING';
var FETCH_ORIGIN_FULFILLED = 'FETCH_ORIGIN_FULFILLED';
var SEARCH_PRODUCT = 'SEARCH_PRODUCT';
var SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING';
var MAP_PRODUCT = 'MAP_PRODUCT';
var MAP_PRODUCT_PENDING = 'MAP_PRODUCT_PENDING';
var MAP_PRODUCT_REJECTED = 'MAP_PRODUCT_REJECTED';
var MAP_PRODUCT_FULFILLED = 'MAP_PRODUCT_FULFILLED';
var SEARCH_PRODUCT_FULFILLED = 'SEARCH_PRODUCT_FULFILLED';
var SEARCH_PRODUCT_REJECTED = 'SEARCH_PRODUCT_REJECTED';
var SAVE_MAPPING = 'SAVE_MAPPING';
var SAVE_MAPPING_FULFILLED = 'SAVE_MAPPING_FULFILLED';
var SAVE_MAPPING_FULFILLED_TIMEOUT = "SAVE_MAPPING_FULFILLED_TIMEOUT";
var SAVE_OFFERING_FULFILLED = 'SAVE_OFFERING_FULFILLED';
var FETCH_ALTERNATIVE_NAMES = 'FETCH_ALTERNATIVE_NAMES';
var FETCH_ALTERNATIVE_NAMES_FULFILLED = 'FETCH_ALTERNATIVE_NAMES_FULFILLED';
var FETCH_MANUFACTURER = 'FETCH_MANUFACTURER';
var FETCH_MANUFACTURER_PENDING = 'FETCH_MANUFACTURER_PENDING';
var FETCH_MANUFACTURER_FULFILLED = 'FETCH_MANUFACTURER_FULFILLED';
var FETCH_PACKAGING_TYPES = 'FETCH_PACKAGING_TYPES';
var FETCH_PACKAGING_TYPES_FULFILLED = 'FETCH_PACKAGING_TYPES_FULFILLED';
var initialState = {
  productsMapping: {},
  productOffering: {},
  data: [],
  mappedData: [],
  productForms: [],
  productConditions: [],
  productGrades: [],
  productAge: [],
  location: [],
  recentProducts: [],
  origin: [],
  originFetched: false,
  manufacturer: [],
  manufacturerFetched: false,
  packagingTypes: [],
  isFetching: false,
  isFetchingManufacturer: false,
  isFetchingOrigin: false,
  isMapFetching: false,
  alternativeNames: [],
  productMappingValidation: false,
  productOfferingValidation: false,
  savedMapping: false,
  fileMaxSize: 20 // MB

};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "rrf/setSubmitFailed":
      {
        if (action.model == "forms.productMapping" && action.submitFailed == true) {
          return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
            productMappingValidation: false
          });
        } else if (action.model == "forms.productOffering" && action.submitFailed == true) {
          return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
            productOfferingValidation: false
          });
        }

        return state;
      }

    case SAVE_MAPPING_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productMappingValidation: true,
          products: {
            isFetching: false
          },
          savedMapping: true
        });
      }

    case SAVE_MAPPING_FULFILLED_TIMEOUT:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          savedMapping: false
        });
      }

    case SAVE_OFFERING_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productOfferingValidation: true
        });
      }

    case FETCH_PRODUCT_FORMS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productForms: action.payload
        });
      }

    case FETCH_MANUFACTURER_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingManufacturer: true,
          manufacturerFetched: false
        });
      }

    case FETCH_MANUFACTURER_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingManufacturer: false,
          manufacturer: action.payload.data,
          manufacturerFetched: action.payload.status
        });
      }

    case FETCH_PRODUCT_CONDITIONS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productConditions: action.payload
        });
      }

    case FETCH_PRODUCT_GRADE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productGrade: action.payload
        });
      }

    case FETCH_ORIGIN_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingOrigin: true,
          origin: "",
          originFetched: false
        });
      }

    case FETCH_ORIGIN_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingOrigin: false,
          origin: action.payload.data,
          originFetched: action.payload.status
        });
      }

    case FETCH_PRODUCT_AGE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productAge: action.payload
        });
      }

    case FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          recentProducts: action.payload
        });
      }

    case SEARCH_PRODUCT_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetching: true
        });
      }

    case SEARCH_PRODUCT_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetching: false,
          productsFetched: false
        });
      }

    case SEARCH_PRODUCT_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetching: false,
          data: action.payload.data,
          productsFetched: action.payload.status
        });
      }

    case MAP_PRODUCT_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isMapFetching: true,
          mappedDataFetched: "no"
        });
      }

    case MAP_PRODUCT_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isMapFetching: false
        });
      }

    case MAP_PRODUCT_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isMapFetching: false,
          mappedData: action.payload.data,
          mappedDataFetched: action.payload.status
        });
      }

    case FETCH_ALTERNATIVE_NAMES_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          alternativeNames: action.payload
        });
      }

    case FETCH_PACKAGING_TYPES_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          packagingTypes: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function addLotSaveOffering() {
  return {
    type: SAVE_OFFERING_FULFILLED
  };
}
function searchProducts(search) {
  return {
    type: SEARCH_PRODUCT,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/products', {
      params: {
        search: search
      }
    }).then(function (response) {
      return response;
    })
  };
}
function mapProducts(search) {
  return {
    type: MAP_PRODUCT,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-templates', {
      params: {
        search: search
      }
    }).then(function (response) {
      return response;
    })
  };
}
function fetchManufacturer() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    type: FETCH_MANUFACTURER,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/manufacturers', {
      params: {
        search: filter
      }
    }).then(function (result) {
      return result;
    })
  };
}
function fetchProductForms() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PRODUCT_FORMS,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-forms', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchProductConditions() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PRODUCT_CONDITIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-conditions', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchProductGrade() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PRODUCT_GRADE,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-grades', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchOrigin() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    type: FETCH_ORIGIN,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/countries', {
      params: {
        search: filter
      }
    }).then(function (result) {
      return result;
    })
  };
}
function fetchProductAge() {
  return {
    type: FETCH_PRODUCT_AGE,
    payload: [{
      id: 1,
      name: '0 - 3 months'
    }, {
      id: 2,
      name: '3 - 6 months'
    }, {
      id: 3,
      name: '6 - 9 months'
    }, {
      id: 4,
      name: '9 - 12 months'
    }, {
      id: 5,
      name: '12+ months'
    }, {
      id: 6,
      name: 'Custom Product Age'
    }]
  };
}
function fetchRecentAddedProducts() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  return {
    type: FETCH_RECEANT_ADDED_PRODUCTS,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/products', {
      params: {
        srtb: 'updatedAt',
        lmt: limit
      }
    }).then(function (result) {
      return result.data.products;
    })
  };
}
function saveMapping(values) {
  if (values.fakeSubmit) {
    return {
      type: SAVE_MAPPING_FULFILLED
    };
  } else {
    delete values.fakeSubmit;
  }

  return {
    type: SAVE_MAPPING,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("/prodex/api/product-templates", values)
  };
}
function setSavedMappingToFalse() {
  return {
    type: SAVE_MAPPING_FULFILLED_TIMEOUT
  };
}
function fetchAlternativeNames(id) {
  return {
    type: FETCH_ALTERNATIVE_NAMES,
    payload: _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve({
      "data": {
        "alternativeNames": [{
          "id": 1,
          "alternativeName": "Elon"
        }, {
          "id": 2,
          "alternativeName": "Musk"
        }, {
          "id": 3,
          "alternativeName": "Must"
        }, {
          "id": 4,
          "alternativeName": "Sleep"
        }]
      },
      "status": "success"
    }).then(function (result) {
      return result.data.alternativeNames;
    })
  };
}
function fetchPackagingTypes() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PACKAGING_TYPES,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/packaging-types', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}

/***/ }),

/***/ "./src/pages/orders/action-types.js":
/*!******************************************!*\
  !*** ./src/pages/orders/action-types.js ***!
  \******************************************/
/*! exports provided: ORDERS_FETCH, ORDERS_FETCH_REQUESTED, ORDERS_FETCH_SUCCESS, ORDERS_FETCH_FAILURE, ORDERS_DETAIL_FETCH, ORDERS_DETAIL_FETCH_REQUESTED, ORDERS_DETAIL_FETCH_SUCCESS, ORDERS_DETAIL_FETCH_FAILURE, ORDER_CONFIRM_FETCH, ORDER_CONFIRM_FETCH_REQUESTED, ORDER_CONFIRM_FETCH_SUCCESS, ORDER_CONFIRM_FETCH_FAILURE, ORDER_REJECT_FETCH, ORDER_REJECT_FETCH_REQUESTED, ORDER_REJECT_FETCH_SUCCESS, ORDER_REJECT_FETCH_FAILURE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH", function() { return ORDERS_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH_REQUESTED", function() { return ORDERS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH_SUCCESS", function() { return ORDERS_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH_FAILURE", function() { return ORDERS_FETCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH", function() { return ORDERS_DETAIL_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH_REQUESTED", function() { return ORDERS_DETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH_SUCCESS", function() { return ORDERS_DETAIL_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH_FAILURE", function() { return ORDERS_DETAIL_FETCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH", function() { return ORDER_CONFIRM_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH_REQUESTED", function() { return ORDER_CONFIRM_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH_SUCCESS", function() { return ORDER_CONFIRM_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH_FAILURE", function() { return ORDER_CONFIRM_FETCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH", function() { return ORDER_REJECT_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH_REQUESTED", function() { return ORDER_REJECT_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH_SUCCESS", function() { return ORDER_REJECT_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH_FAILURE", function() { return ORDER_REJECT_FETCH_FAILURE; });
var ORDERS_FETCH = 'ORDERS_FETCH';
var ORDERS_FETCH_REQUESTED = 'ORDERS_FETCH_REQUESTED';
var ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
var ORDERS_FETCH_FAILURE = 'ORDERS_FETCH_FAILURE';
var ORDERS_DETAIL_FETCH = 'ORDERS_DETAIL_FETCH';
var ORDERS_DETAIL_FETCH_REQUESTED = 'ORDERS_DETAIL_FETCH_REQUESTED';
var ORDERS_DETAIL_FETCH_SUCCESS = 'ORDERS_DETAIL_FETCH_SUCCESS';
var ORDERS_DETAIL_FETCH_FAILURE = 'ORDERS_DETAIL_FETCH_FAILURE';
var ORDER_CONFIRM_FETCH = 'ORDER_CONFIRM_FETCH';
var ORDER_CONFIRM_FETCH_REQUESTED = 'ORDER_CONFIRM_FETCH_REQUESTED';
var ORDER_CONFIRM_FETCH_SUCCESS = 'ORDER_CONFIRM_FETCH_SUCCESS';
var ORDER_CONFIRM_FETCH_FAILURE = 'ORDER_CONFIRM_FETCH_FAILURE';
var ORDER_REJECT_FETCH = 'ORDER_REJECT_FETCH';
var ORDER_REJECT_FETCH_REQUESTED = 'ORDER_REJECT_FETCH_REQUESTED';
var ORDER_REJECT_FETCH_SUCCESS = 'ORDER_REJECT_FETCH_SUCCESS';
var ORDER_REJECT_FETCH_FAILURE = 'ORDER_REJECT_FETCH_FAILURE';

/***/ }),

/***/ "./src/pages/orders/actions.js":
/*!*************************************!*\
  !*** ./src/pages/orders/actions.js ***!
  \*************************************/
/*! exports provided: loadData, loadDetail, confirmOrder, rejectOrder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadData", function() { return loadData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDetail", function() { return loadDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmOrder", function() { return confirmOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rejectOrder", function() { return rejectOrder; });
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action-types */ "./src/pages/orders/action-types.js");

var loadData = function loadData(endpointType) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["ORDERS_FETCH"],
    payload: {
      endpointType: endpointType,
      filter: filter
    }
  };
};
var loadDetail = function loadDetail(endpointType, selectedIndex) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["ORDERS_DETAIL_FETCH"],
    payload: {
      endpointType: endpointType,
      selectedIndex: selectedIndex
    }
  };
};
var confirmOrder = function confirmOrder(orderId) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["ORDER_CONFIRM_FETCH"],
    payload: {
      orderId: orderId
    }
  };
};
var rejectOrder = function rejectOrder(orderId) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["ORDER_REJECT_FETCH"],
    payload: {
      orderId: orderId
    }
  };
};

/***/ }),

/***/ "./src/pages/orders/components/Orders.js":
/*!***********************************************!*\
  !*** ./src/pages/orders/components/Orders.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_orders_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/orders.css */ "./src/pages/orders/styles/orders.css");
/* harmony import */ var _styles_orders_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_orders_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/Spinner/Spinner */ "./src/components/Spinner/Spinner.js");
/* harmony import */ var _components_Filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/Filter */ "./src/components/Filter/index.js");
/* harmony import */ var _components_SubMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/SubMenu */ "./src/components/SubMenu/index.js");
/* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-perfect-scrollbar */ "react-perfect-scrollbar");
/* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__);







var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/pages/orders/components/Orders.js";







var Orders =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Orders, _Component);

  function Orders() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Orders);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Orders).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Orders, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadData(this.props.endpointType);
    }
  }, {
    key: "loadData",
    value: function loadData(endpointType, filterData) {
      //this.props.filterData = filterData
      this.props.loadData(endpointType, filterData);
    }
  }, {
    key: "handleScrollY",
    value: function handleScrollY() {
      var topPosition = document.querySelector('#datatable-wrapper > .scrollbar-container').scrollTop;
      var fixHeader = document.querySelectorAll('#datatable-wrapper th > .fix-header');

      for (var i = 0; i < fixHeader.length; i++) {
        fixHeader[i].style.top = topPosition + 'px';
      }

      var xScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-x');
      var yScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-y');
      xScrollbar.style.marginBottom = -topPosition + 'px';
      yScrollbar.style.marginTop = topPosition + 'px';
    }
  }, {
    key: "handleScrollX",
    value: function handleScrollX() {
      var leftPosition = document.querySelector('#datatable-wrapper > .scrollbar-container').scrollLeft;
      var xScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-x');
      var yScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-y');
      xScrollbar.style.marginLeft = leftPosition + 'px';
      yScrollbar.style.marginRight = -leftPosition + 'px';
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          endpointType = _this$props.endpointType,
          match = _this$props.match,
          rows = _this$props.rows,
          isFetching = _this$props.isFetching,
          activeStatus = _this$props.activeStatus;
      var status = this.props.filterData.status;
      var ordersType = match.params.type.charAt(0).toUpperCase() + match.params.type.slice(1);
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        id: "page",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "top-toolbar",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("ul", {
        className: "quick-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'All'
          }));
        },
        className: !activeStatus || activeStatus === 'All' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, "ALL"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'Pending'
          }));
        },
        className: activeStatus === 'Pending' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, "PENDING"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'In Transit'
          }));
        },
        className: activeStatus === 'In Transit' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, "IN TRANSIT"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'Review'
          }));
        },
        className: activeStatus === 'Review' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, "REVIEW"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'Credit'
          }));
        },
        className: activeStatus === 'Credit' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, "CREDIT"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'Completed'
          }));
        },
        className: activeStatus === 'Completed' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }, "COMPLETED"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'Returned'
          }));
        },
        className: activeStatus === 'Returned' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, "RETURNED"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        value: endpointType,
        onClick: function onClick() {
          return _this.loadData(endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.filterData, {
            status: 'Declined'
          }));
        },
        className: activeStatus === 'Declined' ? 'active' : '',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "DECLINED")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_SubMenu__WEBPACK_IMPORTED_MODULE_11__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "header-top clean",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h1", {
        className: "header inv-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, activeStatus ? activeStatus : 'All', " ", ordersType, " Orders")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_Filter__WEBPACK_IMPORTED_MODULE_10__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        orderId: true,
        orderDate: true,
        customer: true,
        product: true,
        orderStatus: {
          filterValue: activeStatus
        },
        filterFunc: function filterFunc(inputs) {
          return _this.props.loadData(endpointType, inputs);
        }
      }, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      })), isFetching ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_9__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        id: "datatable-wrapper",
        className: "data-table-wr orders",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12___default.a, {
        onScrollY: this.handleScrollY,
        onScrollX: this.handleScrollX,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("table", {
        id: "saleOrdersTable",
        className: "data-table",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("thead", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, "Order ID", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, "Order ID")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, "Status", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, "Status")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, "Order Date", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, "Order Date")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, ordersType === 'Sales' ? 'Customer' : 'Vendor', react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, ordersType === 'Sales' ? 'Customer' : 'Vendor')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, "Product Name", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, "Product Name")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, "Order", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, "Order")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, "Shipping", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, "Shipping")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, "Review", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, "Review")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }, "Credit", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }, "Credit")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, "Payment", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, "Payment")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        className: "a-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, "B/L", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, "B/L")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        className: "a-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }, "SDS", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }, "SDS")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        className: "a-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }, "CofA", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }, "CofA")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("th", {
        className: "a-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, "Order Total", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "fix-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, "Order Total")))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("tbody", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, rows.map(function (r) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("tr", {
          key: r.id,
          onClick: function onClick() {
            _this.props.history.push("/orders/".concat(ordersType.toLowerCase(), "/").concat(r.id));
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          },
          __self: this
        }, r.id), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        }, r.globalStatus), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          },
          __self: this
        }, r.date), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          },
          __self: this
        }, r.customerName), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          },
          __self: this
        }, r.productName), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          },
          __self: this
        }, r.orderStatus), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          },
          __self: this
        }, r.shippingStatus), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          },
          __self: this
        }, r.reviewStatus), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 104
          },
          __self: this
        }, r.creditStatus), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 105
          },
          __self: this
        }, r.paymentStatus), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          className: "a-center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("i", {
          className: "list unknown",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          className: "a-center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("i", {
          className: "list positive",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          className: "a-center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("i", {
          className: "list negative",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("td", {
          className: "a-right",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 109
          },
          __self: this
        }, r.orderTotal));
      }))))));
    }
  }]);

  return Orders;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Orders);

/***/ }),

/***/ "./src/pages/orders/components/OrdersContainer.js":
/*!********************************************************!*\
  !*** ./src/pages/orders/components/OrdersContainer.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Orders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Orders */ "./src/pages/orders/components/Orders.js");
/* harmony import */ var _helpers_Orders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/Orders */ "./src/helpers/Orders.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./src/pages/orders/actions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/functions */ "./src/utils/functions.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment/moment */ "moment/moment");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_7__);









function transformToRows(data, type) {
  return data.map(function (i) {
    return {
      id: i.id,
      globalStatus: i.globalStatus,
      date: moment_moment__WEBPACK_IMPORTED_MODULE_7___default()(i.orderDate).format('MM/DD/YYYY'),
      customerName: type === 'sales' ? i.buyer.name : i.seller.company.name,
      productName: typeof i.orderItems[0].name !== 'undefined' ? i.orderItems[0].name : 'N/A',
      orderStatus: _helpers_Orders__WEBPACK_IMPORTED_MODULE_4__["getOrderStatus"](i.orderStatus),
      shippingStatus: _helpers_Orders__WEBPACK_IMPORTED_MODULE_4__["getShippingStatus"](i.shippingStatus),
      reviewStatus: _helpers_Orders__WEBPACK_IMPORTED_MODULE_4__["getReviewStatus"](i.reviewStatus),
      creditStatus: _helpers_Orders__WEBPACK_IMPORTED_MODULE_4__["getCreditStatus"](i.creditStatus),
      paymentStatus: _helpers_Orders__WEBPACK_IMPORTED_MODULE_4__["getPaymentStatus"](i.paymentStatus),
      bl: '',
      sds: '',
      cofA: '',
      total: '',
      orderTotal: "$" + i.totalPrice.formatMoney(2)
    };
  });
}

function mapStateToProps(state, ownProps) {
  var orders = state.orders;

  if (ownProps.match.params.type !== orders.dataType) {
    orders.data = [];
  }

  return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({
    endpointType: ownProps.match.params.type === 'sales' ? 'sale' : ownProps.match.params.type
  }, orders, {
    isOpen: state.isOpen,
    filterData: state.forms.filter,
    rows: transformToRows(orders.data, ownProps.match.params.type),
    activeStatus: orders.statusFilter
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(_Orders__WEBPACK_IMPORTED_MODULE_3__["default"]));

/***/ }),

/***/ "./src/pages/orders/index.js":
/*!***********************************!*\
  !*** ./src/pages/orders/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_OrdersContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/OrdersContainer */ "./src/pages/orders/components/OrdersContainer.js");

/* harmony default export */ __webpack_exports__["default"] = (_components_OrdersContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/pages/orders/styles/orders.css":
/*!********************************************!*\
  !*** ./src/pages/orders/styles/orders.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/utils/auth.js":
/*!***************************!*\
  !*** ./src/utils/auth.js ***!
  \***************************/
/*! exports provided: withAuth, setAuthToken, deleteAuthToken, checkToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withAuth", function() { return withAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAuthToken", function() { return setAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAuthToken", function() { return deleteAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkToken", function() { return checkToken; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Spinner/Spinner */ "./src/components/Spinner/Spinner.js");
/* harmony import */ var _modules_identity__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../modules/identity */ "./src/modules/identity.js");






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/utils/auth.js";






function withAuth(ComposedComponent) {
  var requireAuth =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(requireAuth, _React$Component);

    function requireAuth() {
      Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, requireAuth);

      return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(requireAuth).apply(this, arguments));
    }

    Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(requireAuth, [{
      key: "verify",
      value: function verify(props) {
        if (!props.isAuthenticated && !props.isFetchingIdentity) {
          if (props.location.pathname !== "/login") props.history.push("/login");
        }

        if (!props.isFetchingIdentity && !localStorage.jwtoken) {
          Object(_modules_identity__WEBPACK_IMPORTED_MODULE_11__["logout"])();
          if (props.location.pathname !== "/login") props.history.push("/login");
        }
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.verify(this.props);
      }
    }, {
      key: "componentWillUpdate",
      value: function componentWillUpdate(nextProps) {
        this.verify(nextProps);
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.isFetchingIdentity ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_10__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(ComposedComponent, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }));
      }
    }]);

    return requireAuth;
  }(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

  requireAuth.propTypes = {
    isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool.isRequired,
    isFetchingIdentity: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool.isRequired
  };

  function mapStateToProps(store) {
    return {
      isAuthenticated: store.identity.isAuthenticated,
      isFetchingIdentity: store.identity.identity.isFetching
    };
  }

  return Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps)(requireAuth);
}
function setAuthToken(token) {
  localStorage.setItem('jwtoken', token);
  axios__WEBPACK_IMPORTED_MODULE_6___default.a.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
function deleteAuthToken() {
  localStorage.removeItem('jwtoken');
  delete axios__WEBPACK_IMPORTED_MODULE_6___default.a.defaults.headers.common['Authorization'];
}
function checkToken(props) {
  //use isFetchingIdentity ?
  if (!props.isFetchingIdentity && !localStorage.jwtoken) {
    Object(_modules_identity__WEBPACK_IMPORTED_MODULE_11__["logout"])();
    if (props.location.pathname !== "/login") props.history.push("/login");
    return true;
  }

  return false;
}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: ROLE_GUEST, DATE_FORMAT, PRICE_PRECISION, DEBOUNCE_TIME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLE_GUEST", function() { return ROLE_GUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_FORMAT", function() { return DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRICE_PRECISION", function() { return PRICE_PRECISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBOUNCE_TIME", function() { return DEBOUNCE_TIME; });
var ROLE_GUEST = 'ROLE_GUEST'; //USER - ROLE

var DATE_FORMAT = 'MM/DD/YYYY';
var PRICE_PRECISION = 2;
var DEBOUNCE_TIME = 50; //ms

/***/ }),

/***/ "./src/utils/functions.js":
/*!********************************!*\
  !*** ./src/utils/functions.js ***!
  \********************************/
/*! exports provided: filterNonEmptyAttributes, resetForm, getUnit, getSelectedDataTable, getSelectedRowsDataTable, transformRequestOptions, filterByUniqueProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterNonEmptyAttributes", function() { return filterNonEmptyAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetForm", function() { return resetForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnit", function() { return getUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedDataTable", function() { return getSelectedDataTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedRowsDataTable", function() { return getSelectedRowsDataTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformRequestOptions", function() { return transformRequestOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterByUniqueProperty", function() { return filterByUniqueProperty; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/entries */ "./node_modules/@babel/runtime-corejs2/core-js/object/entries.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_6__);







var filterNonEmptyAttributes = function filterNonEmptyAttributes(object) {
  return _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5___default()(object).filter(function (_ref) {
    var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return value !== null && value !== '';
  }).reduce(function (carry, _ref3) {
    var _ref4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, carry, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, key, value));
  }, {});
}; // eslint-disable-next-line

Number.prototype.formatMoney = function (c) {
  var n = this,
      d = ".",
      t = ",",
      s = n < 0 ? "-" : "",
      i = String(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(n = Math.abs(Number(n) || 0).toFixed(c), 10)),
      j = i.length;
  j = j > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}; //resetForm is action-creator so its required for usage to include it into index file


var resetForm = function resetForm(model) {
  return function (dispatch) {
    dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_6__["actions"].reset(model));
  };
}; // eslint-disable-next-line

Number.prototype.formatNumber = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var getUnit = function getUnit(unitName) {
  switch (unitName) {
    case "pound":
      return "lb";

    case "gallon":
      return "gal";

    default:
      return "#";
  }
};
var getSelectedDataTable = function getSelectedDataTable(dataTable) {
  if (!dataTable) return 0;
  var selected = 0;

  for (var i = 0; i < dataTable.rowsOpns.length; i++) {
    for (var j = 0; j < dataTable.rowsOpns[i].rows.length; j++) {
      if (dataTable.rowsOpns[i].rows[j].selected) selected++;
    }
  }

  return selected;
};
var getSelectedRowsDataTable = function getSelectedRowsDataTable(dataTable) {
  if (!dataTable) return false;
  var selectedRows = [];

  for (var i = 0; i < dataTable.rowsOpns.length; i++) {
    for (var j = 0; j < dataTable.rowsOpns[i].rows.length; j++) {
      if (dataTable.rowsOpns[i].rows[j].selected) selectedRows.push(dataTable.rowsOpns[i].rows[j].id);
    }
  }

  return selectedRows;
};
var transformRequestOptions = function transformRequestOptions(params) {
  var options = '';

  var _loop = function _loop(key) {
    if (Object(_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(params[key]) !== 'object') {
      options += "".concat(key, "=").concat(params[key], "&");
    } else if (Object(_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(params[key]) === 'object' && params[key].length) {
      // eslint-disable-next-line
      params[key].forEach(function (el) {
        options += "".concat(key, "=").concat(el, "&");
      });
    }
  };

  for (var key in params) {
    _loop(key);
  }

  return options ? options.slice(0, -1) : options;
};
var filterByUniqueProperty = function filterByUniqueProperty(arr, property) {
  var uniqueArr = [];
  arr.filter(function (item) {
    var i = uniqueArr.findIndex(function (x) {
      return x[property] === item[property];
    });

    if (i <= -1) {
      uniqueArr.push(item);
    }

    return null;
  });
  return uniqueArr;
};

/***/ }),

/***/ "./src/utils/validation.js":
/*!*********************************!*\
  !*** ./src/utils/validation.js ***!
  \*********************************/
/*! exports provided: required, isNumber, isInteger, min, maxPercent, smaller, bigger, lotNumber, messages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return isInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxPercent", function() { return maxPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smaller", function() { return smaller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bigger", function() { return bigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lotNumber", function() { return lotNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messages", function() { return messages; });
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/number/is-integer */ "./node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1__);


var required = function required(val) {
  return val && val !== "";
};
var isNumber = function isNumber(val) {
  return typeof val === 'undefined' || !isNaN(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(val)) && isFinite(val);
};
var isInteger = function isInteger(val) {
  return typeof val === 'undefined' || _babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_0___default()(Number(val));
}; //

var min = function min(val, _min) {
  return typeof val === 'undefined' || val > _min;
};
var maxPercent = function maxPercent(val) {
  return typeof val === 'undefined' || val <= 100;
};
var smaller = function smaller(val, max) {
  return _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(val) <= _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(max);
};
var bigger = function bigger(val, min) {
  return _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(val) >= _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(min);
};
var lotNumber = function lotNumber(val) {
  var localLots = JSON.parse(localStorage.getItem('productLots'));
  var lotNumbers = [];

  for (var i = 0; i < localLots.length; i++) {
    lotNumbers.push(localLots[i].lotNumber);
  }

  if (lotNumbers.includes(val)) {
    return false;
  } else {
    return true;
  }
};
var messages = {
  required: "Required",
  isNumber: "Must be number",
  isInteger: "Must be integer",
  min: "Must be grater than 0",
  maxPercent: "Maximum is 100%",
  smaller: "Must be < or = to Max",
  bigger: "Must be > or = to Min",
  lotNumber: "Lot Number already exists"
};

/***/ }),

/***/ "./styles/base.scss":
/*!**************************!*\
  !*** ./styles/base.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./utils/auth.js":
/*!***********************!*\
  !*** ./utils/auth.js ***!
  \***********************/
/*! exports provided: setToken, unsetToken, getTokenFromServerCookie, getTokenFromLocalCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsetToken", function() { return unsetToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTokenFromServerCookie", function() { return getTokenFromServerCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTokenFromLocalCookie", function() { return getTokenFromLocalCookie; });
/* harmony import */ var _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/date/now */ "./node_modules/@babel/runtime-corejs2/core-js/date/now.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "js-cookie");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);

// import jwtDecode from 'jwt-decode'

var setToken = function setToken(accessToken) {
  if (true) {
    return;
  } // Cookie.set('user', jwtDecode(idToken))
  // Cookie.set('idToken', idToken)


  js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('accessToken', accessToken);
};
var unsetToken = function unsetToken() {
  if (true) {
    return;
  }

  js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.remove('accessToken'); // to support logging out from all windows

  window.localStorage.setItem('logout', _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0___default()());
};
var getTokenFromServerCookie = function getTokenFromServerCookie(req) {
  if (!req.headers.cookie) {
    return undefined;
  }

  var tokenCookie = req.headers.cookie.split(';').find(function (c) {
    return c.trim().startsWith('accessToken=');
  });
  return tokenCookie;
};
var getTokenFromLocalCookie = function getTokenFromLocalCookie() {
  return js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('accessToken');
}; // Temporary unused. Waiting for valid jwt object from server
// export const getUserFromServerCookie = (req) => {
//   if (!req.headers.cookie) {
//     return undefined
//   }
//   const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('idToken='))
//   if (!jwtCookie) {
//     return undefined
//   }
//   const jwt = jwtCookie.split('=')[1]
//   return jwtDecode(jwt)
// }
// export const getUserFromLocalCookie = () => {
//   return Cookie.getJSON('user')
// }

/***/ }),

/***/ 3:
/*!*************************************!*\
  !*** multi ./pages/orders/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mirek/Documents/dev/prodex-frontend/pages/orders/index.js */"./pages/orders/index.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "debounce":
/*!***************************!*\
  !*** external "debounce" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debounce");

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "moment/moment":
/*!********************************!*\
  !*** external "moment/moment" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment/moment");

/***/ }),

/***/ "next-server/dist/lib/router/router":
/*!*****************************************************!*\
  !*** external "next-server/dist/lib/router/router" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/router/router");

/***/ }),

/***/ "next-server/dist/lib/utils":
/*!*********************************************!*\
  !*** external "next-server/dist/lib/utils" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/utils");

/***/ }),

/***/ "next-server/head":
/*!***********************************!*\
  !*** external "next-server/head" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-datepicker":
/*!***********************************!*\
  !*** external "react-datepicker" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-datepicker");

/***/ }),

/***/ "react-intl":
/*!*****************************!*\
  !*** external "react-intl" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-perfect-scrollbar":
/*!******************************************!*\
  !*** external "react-perfect-scrollbar" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-perfect-scrollbar");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-redux-form":
/*!***********************************!*\
  !*** external "react-redux-form" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux-form");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "semantic-ui-react":
/*!************************************!*\
  !*** external "semantic-ui-react" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=orders.js.map