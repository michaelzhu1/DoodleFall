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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_blockbase__ = __webpack_require__(2);




class Game {
  constructor() {
    this.gamePanel = null;
    this.player = null;
    this.point = 0;
    this.startButton = null;
    this.createBlockId = 0;
    this.gamePanel = document.getElementById("game-wrapper");
    this.gamePanel.focus();
    this.gamePanel.style.backgrouldcolor = "red";
    this.startPlayer();
    this.startBlock();
  }

  startPlayer() {
    this.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]();
    this.player.setPosition(this.gamePanel);
  }

  startBlock() {
    this.block = new __WEBPACK_IMPORTED_MODULE_1__blocks_blockbase__["a" /* default */]();

  }

  keyDown() {
    return (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.player.keyDown(e);
      }
    };
  }

  keyUp() {
    return (e) => {
      if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.player.keyUp(e);
      }
    };
  }

  addPoint() {}

  gameOver() {}

  reset() {}
}

const start = button => {
  if (Game.startButton === false) {
    Game.startButton = button;
  } else {
    Game.reset();
  }
  new Game();
};

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor() {
    this.health = 100;
    this.dom = document.createElement('div');
    this.isMoving = false;
  }
  setPosition(gamePanel) {
    this.gamePanel = gamePanel;
    this.gamePanel.appendChild(this.dom);
    this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + 'px';
    this.dom.style.top = 70 + 'px';
  }

  moveLeftOrRight() {

  }

  keyDown() {

  }

  keyUp() {

  }



}


/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BlockBase {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BlockBase);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map