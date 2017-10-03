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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_block_generator__ = __webpack_require__(3);




class Game {
  constructor() {
    this.gamePanel = null;
    this.player = null;
    this.point = 0;
    this.startButton = null;
    this.createBlockId = 0;
  }

  init() {
    this.gamePanel = document.getElementById("game-wrapper");
    this.gamePanel.focus();
    document.body.onkeydown = (e) => { Game.keydown(e);};
    document.body.onkeyup = (e) => {Game.keyup(e);};
    this.startPlayer();
    this.startBlock();
  }

  //initialize player
  startPlayer() {
    this.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]();
    this.player.setPosition(this.gamePanel);
    this.player.gameOver = () => { Game.gameOver();};
    this.player.moveDown();
  }
  //initialize blocks
  startBlock() {
    this.block = new __WEBPACK_IMPORTED_MODULE_1__blocks_blockbase__["a" /* default */]();
    let that = this;
    const time = 1100;
    __WEBPACK_IMPORTED_MODULE_2__blocks_block_generator__["default"].init(this.gamePanel, this.player);
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

  addPoint() {
    this.point += 1;
    document.getElementById("point").innerHTML = Math.floor(this.point/5);
  }

  gameOver() {
    __WEBPACK_IMPORTED_MODULE_2__blocks_block_generator__["default"].stopBlock();
    document.body.onkeydown = null;
    document.body.onkeyup = null;
    clearInterval(this.createBlockId);
  }

  reset() {}
}

const Start = button => {
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
    this.dom = null;
    //player's vertical moving speed
    this.moveYSpeed = 0;
    //player's horizontal moving speed
    this.moveXSpeed = 8;
    this.moveXId = 0;
    this.moveYid = 0;
    this.isMoving = false;
    this.isLive = true;
    this.gamePanel = null;
    this.elasticity = 0.8;
    this.gravity = 1;
    this.defaultMoveYSpeed = 1;
    this.moveFrame = 40;
  }
  init() {
    this.dom = document.createElement('div');

  }

  setPosition(gamePanel) {
    this.gamePanel = gamePanel;
    this.gamePanel.appendChild(this.dom);
    this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + 'px';
    this.dom.style.top = 70 + 'px';
  }

  moveLeftOrRight(direction) {
    let self = this;
    this.dom.className = direction;
    const move = () =>{
      if (self.isLive === false) {

      }
    }
  }

  //moves left or right according to which key is pressed
  keyDown(e) {
    if (this.isMove) {
      return;
    }
    this.isMove = true;
    const dir = e.key === 37 ? "left" : "right" ;
    this.moveLeftOrRight(dir);
  }

  //once key is released, it stops moving
  keyUp(e) {
    this.isMoving = false;
    clearInterval(this.moveXId);
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick_block__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick_block___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__brick_block__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grass_block__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grass_block___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__grass_block__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lava_block__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lava_block___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__lava_block__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spring_block__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spring_block___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__spring_block__);





class BlockGenerator {
  constructor() {
    this.gamePanel = null;
    this.player = null;
    this.blockList = [];

  }

  init(gamePanel, player) {
    this.gamePanel = gamePanel;
    this.player = player;
  }

  //randomly generate different kinds of blocks in random positions
  generateBlock() {
    const random = Math.floor(Math.random() * 11 + 1);
    let block;
    if (random === 5) {
       block = new __WEBPACK_IMPORTED_MODULE_0__brick_block___default.a();
    } else if (random === 7){
       block = new __WEBPACK_IMPORTED_MODULE_1__grass_block___default.a();
    } else if (random === 9){
       block = new __WEBPACK_IMPORTED_MODULE_3__spring_block___default.a();
    } else if (random === 11) {
       block = new __WEBPACK_IMPORTED_MODULE_2__lava_block___default.a();
    }
    const randomPosition = Math.floor(Math.random() * 5 + 1);
    this.setBlock(block, randomPosition);
  }

  //ensure the player have a easy time starting the game
  defaultBlock() {
    let block = new __WEBPACK_IMPORTED_MODULE_0__brick_block___default.a();
    this.setBlock(block, 3);
  }

}


/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map