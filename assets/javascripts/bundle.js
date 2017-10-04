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


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default();
document.onkeydown = function (e) {
  game.keyDown(e);
};
document.onkeyup = function (e) {
  game.keyUp(e);
};

document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.querySelector(".start");
  game.gamePanel = document.getElementById("game-wrapper");
  game.gamePanel.focus();
  game.startPlayer();
  game.startBlock();
  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _blockbase = __webpack_require__(3);

var _blockbase2 = _interopRequireDefault(_blockbase);

var _block_generator = __webpack_require__(4);

var _block_generator2 = _interopRequireDefault(_block_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.gamePanel = null;
    this.player = null;
    this.point = 0;
    this.startButton = null;
    this.createBlockId = 0;
  }

  //initialize player


  _createClass(Game, [{
    key: "startPlayer",
    value: function startPlayer() {
      this.player = new _player2.default();
      this.player.setPosition(this.gamePanel);
      this.player.gameOver = function () {
        Game.gameOver();
      };
      this.player.moveDown();
    }
    //initialize blocks

  }, {
    key: "startBlock",
    value: function startBlock() {
      this.block = new _blockbase2.default();
      var that = this;
      var time = 1100;
      new _block_generator2.default(this.gamePanel, this.player);
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.player.keyDown(e);
      }
    }
  }, {
    key: "keyUp",
    value: function keyUp() {
      var _this = this;

      return function (e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          _this.player.keyUp(e);
        }
      };
    }
  }, {
    key: "addPoint",
    value: function addPoint() {
      this.point += 1;
      document.getElementById("point").innerHTML = Math.floor(this.point / 5);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      _block_generator2.default.stopBlock();
      document.body.onkeydown = null;
      document.body.onkeyup = null;
      clearInterval(this.createBlockId);
    }
  }, {
    key: "reset",
    value: function reset() {
      _block_generator2.default.clearBlock();
      this.gamePanel.removeChild(this.player.dom);
      this.gamePanel = null;
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

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

  _createClass(Player, [{
    key: "setPosition",
    value: function setPosition(gamePanel) {
      this.dom = document.createElement("div");
      this.gamePanel = gamePanel;
      this.gamePanel.appendChild(this.dom);
      this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + "px";
      this.dom.style.top = 70 + "px";
    }

    //moves left or right according to which key is pressed

  }, {
    key: "keyDown",
    value: function keyDown(e) {
      if (this.isMove) {
        return;
      }
      this.isMove = true;
      var dir = e.key === "ArrowLeft" ? "left" : "right";
      this.moveLeftOrRight(dir);
    }

    //once key is released, it stops moving

  }, {
    key: "keyUp",
    value: function keyUp(e) {
      this.isMoving = false;
      clearInterval(this.moveXId);
    }
  }, {
    key: "moveLeftOrRight",
    value: function moveLeftOrRight(direction) {
      console.log(direction);
      var self = this;
      this.dom.className = direction;
      var move = function move() {
        if (self.isLive === false) {
          clearInterval(self.moveXId);
        }
        self.dom.style.left = self.dom.offsetLeft + self.movepx * (direction === "left" ? -1 : 1) + "px";

        if (self.dom.offsetLeft >= self.gamePanel.clientWidth - self.dom.clientWidth && direction === "right") {
          self.dom.style.left = self.gamePanel.clientWidth - self.dom.clientWidth + "px";
          clearInterval(self.moveXId);
        } else if (self.dom.offsetLeft <= 0 && direction === "left") {
          self.dom.style.left = 0 + "px";
          clearInterval(self.moveXId);
        }
      };
      this.moveXId = setInterval(move, this.movesp);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      var self = this;
      var move = function move() {
        self.dom.style.top = self.dom.offsetTop + self.movepy + "px";
        self.movepy += self.g;
        if (self.checkCrash()) {
          self.dead();
        }
      };
      self.moveYID = setInterval(move, this.movesp);
    }
  }, {
    key: "moveUp",
    value: function moveUp(b_movepx, b_movesp) {
      var self = this;
      var move = function move() {
        self.dom.style.top = self.dom.offsetTop - b_movesp + "px";
        if (self.checkCrash()) {
          self.dead();
        }
      };
      this.moveYId = setInterval(move, b_movesp);
    }
  }, {
    key: "flip",
    value: function flip() {}
  }, {
    key: "checkCrash",
    value: function checkCrash() {}
  }, {
    key: "dead",
    value: function dead() {
      this.isLive = false;
      this.gameOver();
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockBase = function BlockBase() {
  _classCallCheck(this, BlockBase);

  this.positionX = 0;
  this.positionY = 0;
};

exports.default = BlockBase;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brick_block = __webpack_require__(5);

var _brick_block2 = _interopRequireDefault(_brick_block);

var _grass_block = __webpack_require__(6);

var _grass_block2 = _interopRequireDefault(_grass_block);

var _lava_block = __webpack_require__(7);

var _lava_block2 = _interopRequireDefault(_lava_block);

var _spring_block = __webpack_require__(8);

var _spring_block2 = _interopRequireDefault(_spring_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockGenerator = function () {
  function BlockGenerator(gamePanel, player) {
    _classCallCheck(this, BlockGenerator);

    this.gamePanel = gamePanel;
    this.player = player;
    this.blockList = [];
  }

  //randomly generate different kinds of blocks in random positions


  _createClass(BlockGenerator, [{
    key: "generateBlock",
    value: function generateBlock() {
      var random = Math.floor(Math.random() * 11 + 1);
      var block = void 0;
      if (random === 5) {
        block = new _brick_block2.default();
      } else if (random === 7) {
        block = new _grass_block2.default();
      } else if (random === 9) {
        block = new _spring_block2.default();
      } else if (random === 11) {
        block = new _lava_block2.default();
      }
      var randomPosition = Math.floor(Math.random() * 5 + 1);
      this.setBlock(block, randomPosition);
    }

    //ensure the player have a easy time starting the game

  }, {
    key: "defaultBlock",
    value: function defaultBlock() {
      var block = new _brick_block2.default();
      this.setBlock(block, 3);
    }
  }, {
    key: "setBlock",
    value: function setBlock(block, position) {
      var _this = this;

      var self = this;
      block.init();
      block.setPosition(this.gamePanel, position);
      block.onCheckPlayerOn = function () {
        return _this.checkPlayerOn(self.player);
      };
      block.onPlayOn = this.playOn.bind(this);
      block.onCheckPlayerOn = this.checkMoveOut.bind(this);
      block.onEnd = function () {
        self.blockList.remove(_this);
      };
    }
  }, {
    key: "stopBlock",
    value: function stopBlock() {
      for (var i = 0; i < this.blockList.length; i++) {
        this.blockList[i].stopMove();
      }
    }
  }, {
    key: "clearBlock",
    value: function clearBlock() {
      for (var i = 0; i < this.blockList.length; i++) {
        var block = this.blockList[i].pop();
        this.gamePanel.removeChild(block.dom);
        block.dom = null;
        block = null;
      }
    }
  }]);

  return BlockGenerator;
}();

Array.prototype.remove = function (obj) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == obj || this[i].dom == null) {
      this.splice(i, 1);
      break;
    }
  }
  return this;
};

exports.default = BlockGenerator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map