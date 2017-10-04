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
  game.gamePanel = document.getElementById("gamePanel");
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

    this.player = null;
    this.point = 0;
    this.startButton = null;
    this.createBlockId = 0;
  }

  //initialize player


  _createClass(Game, [{
    key: "startPlayer",
    value: function startPlayer() {
      var _this = this;

      this.player = new _player2.default();
      this.player.setPosition(this.gamePanel);
      this.player.gameOver = function () {
        _this.gameOver();
      };
      this.player.moveDown();
    }
    //initialize blocks

  }, {
    key: "startBlock",
    value: function startBlock() {
      this.block = new _blockbase2.default();
      var self = this;
      var time = 1100;
      var newBlock = new _block_generator2.default(this.gamePanel, this.player);
      newBlock.defaultBlock();
      this.createBlockId = setInterval(function () {
        if (self.player.isLive) {
          newBlock.generateBlock();
          self.addPoint();
        }
      }, time);
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
      var _this2 = this;

      return function (e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          _this2.player.keyUp(e);
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
      this.player = null;
      this.point = null;
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

    this.dom = null;
    //player's vertical moving speed
    this.speedY = 0;
    this.isMoving = false;
    //player's horizontal moving speed
    this.moveXId = 0;
    this.moveYid = 0;
    this.isLive = true;
    this.isFlip = false;
    this.gamePanel = null;
    this.elasticity = 0.8;
    this.gravity = 1;
    this.speedX = 8;
    this.defaultSpeedY = 1;
    this.movesp = 40;
    this.dom = document.createElement("div");
    this.dom.className = "player";
    this.speedY = this.defaultSpeedY;
  }

  _createClass(Player, [{
    key: "setPosition",
    value: function setPosition(gamePanel) {
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
      this.dom.className = "player";
    }
  }, {
    key: "moveLeftOrRight",
    value: function moveLeftOrRight(direction) {
      console.log(direction);
      var self = this;
      this.dom.className = direction;

      var move = function move() {
        if (!self.isLive) {
          clearInterval(self.moveXId);
        }
        self.dom.style.left = self.dom.offsetLeft + self.speedX * (direction === "left" ? -1 : 1) + "px";

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
        self.dom.style.top = self.dom.offsetTop + self.speedY + "px";
        self.speedY += self.gravity;
        if (self.checkCrash()) {
          self.dead();
        }
      };
      self.moveYID = setInterval(move, this.movesp);
    }
  }, {
    key: "moveUp",
    value: function moveUp(moveUpSpeed, moveUpFreq) {
      var self = this;
      var move = function move() {
        self.dom.style.top = self.dom.offsetTop - moveUpSpeed + "px";
        if (self.checkCrash()) {
          self.dead();
        }
      };
      this.moveYId = setInterval(move, moveUpFreq);
    }
  }, {
    key: "flip",
    value: function flip() {
      if (this.isFlip) {
        return;
      }
      this.isFlip = true;
      var self = this;
      var initialFlipSpeed = 25;
      var move = function move() {
        initialFlipSpeed *= self.elasticity;
        self.dom.style.top = self.dom.offsetTop - initialFlipSpeed + "px";
        if (self.checkCrash()) {
          self.dead();
        } else if (initialFlipSpeed < 1) {
          self.isFlip = false;
          self.speedY = self.defaultSpeedY;
          self.moveDown();
        } else {
          setTimeout(move, self.movesp);
        }
      };
      setTimeout(move, self.movesp);
    }
  }, {
    key: "checkCrash",
    value: function checkCrash() {
      if (this.dom.offsetTop >= this.gamePanel.offsetHeight - this.dom.clientHeight || this.dom.offsetTop <= 0) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "clearMoveId",
    value: function clearMoveId(speedY) {
      clearInterval(this.moveYId);
      if (speedY) {
        this.speedY = this.defaultSpeedY;
      }
    }
  }, {
    key: "dead",
    value: function dead() {
      this.isLive = false;
      this.gameOver();
      this.clearMoveId();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockBase = function () {
  function BlockBase() {
    _classCallCheck(this, BlockBase);

    this.dom = null;
    this.className = "";
    this.moveId = 0;
    this.needCheckMove = false;
    this.needCheckPlayerOn = true;
    this.movepx = 3;
    this.movesp = 35;
    this.gamePanel = null;
    this.site = {
      1: 0,
      2: 55,
      3: 110,
      4: 165,
      5: 220
    };
    this.dom = document.createElement("div");
    this.dom.className = this.className;
    this.dom.style.width = "80px";
    this.dom.style.height = "10px";
  }

  _createClass(BlockBase, [{
    key: "init",
    value: function init() {
      this.dom = document.createElement("div");
      this.dom.className = this.className;
      this.dom.style.width = "80px";
      this.dom.style.height = "10px";
    }
  }, {
    key: "setPosition",
    value: function setPosition(gamePanel, type) {
      if (this.gamePanel === null) {
        this.gamePanel = gamePanel;
      }
      this.dom.style.left = this.site[type] + "px";
      this.dom.style.top = this.gamePanel.offsetHeight + "px";
      this.gamePanel.appendChild(this.dom);
    }
  }, {
    key: "animation",
    value: function animation() {
      var self = this;
      var animate = function animate() {
        if (self.dom === null) {
          return;
        }
        var top = self.dom.offsetTop - self.movepx;
        self.dom.style.top = top + "px";
        var isPlayerOn = self.needCheckPlayerOn && self.onCheckPlayerOn();
        if (self.needCheckMove) {
          self.onCheckMoveOut();
        }
        //block is out of the dom and player is not on it, then it disappear
        if (top <= -self.dom.offsetHeigt && !isPlayerOn) {
          self.end();
        } else if (isPlayerOn) {
          //excute block effects accordingly
          self.stopMove();
          self.onPlayOn();
        }
      };
      this.moveId = setInterval(animate, this.movesp);
    }
  }, {
    key: "stopMove",
    value: function stopMove() {
      clearTimeout(this.moveId);
    }
  }, {
    key: "end",
    value: function end() {
      this.stopMove();
      this.gamePanel.removeChild(this.dom);
      this.dom = null;
      this.onEnd();
    }
  }, {
    key: "checkPlayerOn",
    value: function checkPlayerOn(player) {
      if (player.isFlip) {
        return false;
      }
      var playerDom = player.dom;
      var blockDom = this.dom;

      //check if player is within the block dom
      if (playerDom.offsetLeft > blockDom.offsetLeft - playerDom.clientWidth && playerDom.offsetLeft < blockDom.offsetLeft + blockDom.clientWidth) {
        //this checks if the player y cordinate is above the block as well as its next move's y cord
        if (playerDom.offsetTop + playerDom.clientHeight <= blockDom.offsetTop && playerDom.offsetTop + playerDom.clientHeight + player.movepy + player.g > blockDom.offsetTop - this.movepx) {
          playerDom.style.top = blockDom.offsetTop - playerDom.offsetHeight + "px";
          this.needCheckPlayerOn = false;
          return true;
        }
      }
      return false;
    }
  }]);

  return BlockBase;
}();

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

var _blockbase = __webpack_require__(3);

var _blockbase2 = _interopRequireDefault(_blockbase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockGenerator = function (_BlockBase) {
  _inherits(BlockGenerator, _BlockBase);

  function BlockGenerator(gamePanel, player) {
    _classCallCheck(this, BlockGenerator);

    var _this = _possibleConstructorReturn(this, (BlockGenerator.__proto__ || Object.getPrototypeOf(BlockGenerator)).call(this));

    _this.gamePanel = gamePanel;
    _this.player = player;
    _this.blockList = [];
    return _this;
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
        block = new _brick_block2.default();
      } else if (random === 9) {
        block = new _brick_block2.default();
      } else if (random === 11) {
        block = new _brick_block2.default();
      } else {
        return;
      }
      var randomPosition = Math.floor(Math.random() * 5 + 1);
      console.log(block);
      this.setBlock(block, randomPosition);
    }

    //ensure the player have a easy time starting the game

  }, {
    key: "defaultBlock",
    value: function defaultBlock() {
      var block = new _brick_block2.default();
      this.setBlock(block, 5);
    }

    // init(gamePanel, player) {
    //   this.gamePanel = gamePanel;
    //   this.player = player;
    // }

  }, {
    key: "setBlock",
    value: function setBlock(block, position) {
      var _this2 = this;

      var self = this;
      block.init();
      block.setPosition(this.gamePanel, position);
      block.onCheckPlayerOn = function () {
        return this.checkPlayerOn(self.player);
      };
      block.onPlayOn = function () {
        _this2.playOn(self.player);
      };
      block.onCheckMoveOut = function () {
        _this2.checkMoveOut(self.player);
      };
      block.onEnd = function () {
        self.blockList.remove(_this2);
      };
      block.animation();
      this.blockList.push(block);
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
}(_blockbase2.default);

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blockbase = __webpack_require__(3);

var _blockbase2 = _interopRequireDefault(_blockbase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrickBlock = function (_BlockBase) {
  _inherits(BrickBlock, _BlockBase);

  function BrickBlock() {
    _classCallCheck(this, BrickBlock);

    var _this = _possibleConstructorReturn(this, (BrickBlock.__proto__ || Object.getPrototypeOf(BrickBlock)).call(this));

    _this.className = "brick";
    return _this;
  }

  _createClass(BrickBlock, [{
    key: "playOn",
    value: function playOn(player) {
      //player stops moving vertically
      player.clearMoveId(true);
      //player moves up with the same speed as block it's on
      player.moveUp(this.movepx, this.movesp);
      this.animation();
      this.needCheckMove = true;
    }
  }, {
    key: "checkMoveOut",
    value: function checkMoveOut(player) {
      var playerDom = player.dom;
      var blockDom = this.dom;

      //when player moves out of the block
      if (playerDom.offsetLeft <= blockDom.offsetLeft - playerDom.clientWidth || playerDom.offsetLeft >= blockDom.offsetLeft + blockDom.clientWidth) {
        //player moves downward
        player.clearMoveId(true);
        player.moveDown();
        this.needCheckMove = false;
        this.needCheckPlayerOn = true;
      }
    }
  }]);

  return BrickBlock;
}(_blockbase2.default);

exports.default = BrickBlock;

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