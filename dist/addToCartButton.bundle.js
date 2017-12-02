/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var addToCartButton = document.querySelectorAll('button[data-aerostat-id'),
      requiredProductData = ['aerostatId', 'id', 'productTitle', 'productVariationTitle', 'price'],
      requiredPlanData = ['aerostatId', 'id', 'productTitle', 'name', 'price', 'interval'];
  var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { items: [] };

  Array.prototype.slice.call(addToCartButton).forEach(function (el) {
    return el.onclick = validateDataset;
  });

  function validateDataset() {
    var isValid = true,
        invalidKey = void 0;
    var requiredData = this.dataset.type === 'plan' ? requiredPlanData : requiredProductData;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = requiredData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        if (this.dataset[value] === null || this.dataset[value] === undefined || this.dataset[value] === "") {
          isValid = false;
          invalidKey = value;
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (isValid) {
      addToCart(this.dataset);
    } else {
      throw new Error(invalidKey + ' is required');
    }
  }

  function addToCart(dataset) {
    var cartItem = {
      aerostat_id: dataset.aerostatId,
      id: dataset.id,
      product_title: dataset.productTitle,
      product_variation_title: dataset.productVariationTitle,
      quantity: dataset.quantity || 1,
      price: {
        usd: dataset.price
      },
      type: dataset.type || 'item',
      product_plan: { //this is just for front end cart and will be omitted on checkout
        name: dataset.name,
        interval: dataset.interval,
        interval_count: dataset.interval_count,
        trial_days: dataset.trialDays || 0
      },
      has_no_shipments: JSON.parse(dataset.hasNoShipments) || false
    };

    if (cart.items.length > 0) {
      var existingCartItems = cart.items.filter(function (item) {
        return item.id === cartItem.id && cartItem.type !== 'plan';
      });
      if (existingCartItems.length > 0) {
        existingCartItems.forEach(function (item) {
          return item.quantity++;
        });
      } else {
        cart.items.push(cartItem);
      }
    } else {
      cart.items.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
})();

/***/ })
/******/ ]);