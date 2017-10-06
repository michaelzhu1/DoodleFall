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

document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.querySelector(".start");

  startButton.addEventListener("click", function () {
    var game = new _game2.default();
    game.startButton = startButton;
    document.onkeydown = function (e) {
      game.keydown(e);
    };
    document.onkeyup = function (e) {
      game.keyup(e);
    };
    game.gamePanel = document.getElementById("gamePanel");
    game.initializePlayer();
    game.initializeBlock();
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

var _parent_block = __webpack_require__(9);

var _parent_block2 = _interopRequireDefault(_parent_block);

var _block_generator = __webpack_require__(4);

var _block_generator2 = _interopRequireDefault(_block_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.player = null;
    this.time = 0;
    this.startButton = null;
    this.createBlockId = 0;
    this.gamePanel = null;
  }

  _createClass(Game, [{
    key: "keydown",
    value: function keydown(e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        this.player.keydown(e);
      }
    }
  }, {
    key: "keyup",
    value: function keyup(e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        this.player.keyup(e);
      }
    }

    //initialize player

  }, {
    key: "initializePlayer",
    value: function initializePlayer() {
      var _this = this;

      this.player = new _player2.default();
      this.player.blockPosition(this.gamePanel);
      this.player.gameOver = function () {
        _this.gameOver();
      };
      this.player.moveDown();
    }
    //initialize blocks

  }, {
    key: "initializeBlock",
    value: function initializeBlock() {
      this.block = new _parent_block2.default();
      var self = this;
      var newBlock = new _block_generator2.default(this.gamePanel, this.player);
      newBlock.defaultBlock();
      // this.clearAllBlocks = function() {
      //   newBlock.clearBlock();
      // };
      this.freezeBlocks = function () {
        newBlock.stopBlock();
      };
      this.createBlockId = setInterval(function () {
        if (self.player.living) {
          newBlock.generateBlock();
          self.timer();
        }
      }, 500);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.freezeBlocks();
      clearInterval(this.createBlockId);
      document.body.onkeydown = null;
      document.body.onkeyup = null;
      this.startButton.style.display = "";
      this.player.dom.style.display = "none";
      this.player = null;
      while (this.gamePanel.childNodes.length > 36) {
        //this finally work!!! remove all blocks in gamePanel SO HAPPY
        this.gamePanel.removeChild(this.gamePanel.lastChild);
      }
      this.gamePanel = null;
      document.onkeydown = null;
      document.onkeyup = null;
      alert("Game Over! You lasted " + Math.floor(this.time / 2) + " seconds");
      this.time = 0;
    }
  }, {
    key: "timer",
    value: function timer() {
      this.time += 1;
      document.getElementById("time").innerHTML = Math.floor(this.time / 2) + " seconds";
    }
  }, {
    key: "clearAllBlocks",
    value: function clearAllBlocks() {}
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
    this.movepy = 0;
    //player's horizontal moving speed
    this.movepx = 8;
    this.k = 0.6;
    this.gravity = 1;
    this.defaultSpeed = 1;
    this.movesp = 35;
    this.dom = document.createElement("div");
    this.dom.className = "player";
    this.movepy = this.defaultSpeed;
    this.isMove = false;
    this.moveXId = 0;
    this.moveYId = 0;
    this.living = true;
    this.isJumping = false;
    this.gamePanel = null;
  }

  _createClass(Player, [{
    key: "blockPosition",
    value: function blockPosition(gamePanel) {
      this.gamePanel = gamePanel;
      this.gamePanel.appendChild(this.dom);
      this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + "px";
      this.dom.style.top = 70 + "px";
    }

    //moves left or right according to which key is pressed

  }, {
    key: "keydown",
    value: function keydown(e) {
      if (this.isMove) {
        return;
      }
      this.isMove = true;
      this.moveLeftOrRight(e.key == "ArrowLeft" ? "left" : "right");
    }

    //once key is released, it stops moving

  }, {
    key: "keyup",
    value: function keyup(e) {
      this.isMove = false;
      clearInterval(this.moveXId);
      this.dom.className = "player";
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      var self = this;
      var move = function move() {
        self.dom.style.top = self.dom.offsetTop + self.movepy + "px";
        //vertical speed + gravity
        self.movepy += self.gravity;
        if (self.isAlive()) {
          self.dead();
        }
      };
      self.moveYId = setInterval(move, this.movesp);
    }
  }, {
    key: "moveUp",
    value: function moveUp(moveUpSpeed, moveUpFreq) {
      var self = this;
      var move = function move() {
        self.dom.style.top = self.dom.offsetTop - moveUpSpeed + "px";
        if (self.isAlive()) {
          self.dead();
        }
      };
      this.moveYId = setInterval(move, moveUpFreq);
    }
  }, {
    key: "jump",
    value: function jump() {
      if (this.isJumping) {
        return;
      }
      this.isJumping = true;
      var self = this;
      var initialJumpSpeed = 25;
      var move = function move() {
        initialJumpSpeed *= self.k;
        self.dom.style.top = self.dom.offsetTop - initialJumpSpeed + "px";
        if (self.isAlive()) {
          self.dead();
        } else if (initialJumpSpeed < 1) {
          //set the vertical speed back to default and move down
          self.isJumping = false;
          self.movepy = self.defaultSpeed;
          self.moveDown();
        } else {
          setTimeout(move, self.movesp);
        }
      };
      setTimeout(move, self.movesp);
    }
  }, {
    key: "dead",
    value: function dead() {
      this.living = false;
      this.gameOver();
      this.clearMoveId(true);
    }
  }, {
    key: "clearMoveId",
    value: function clearMoveId(movepy) {
      clearInterval(this.moveYId);
      if (movepy) {
        this.movepy = this.defaultSpeed;
      }
    }
  }, {
    key: "isAlive",
    value: function isAlive() {
      if (this.dom.offsetTop >= this.gamePanel.offsetHeight - this.dom.clientHeight || this.dom.offsetTop <= 40) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver() {}
  }, {
    key: "moveLeftOrRight",
    value: function moveLeftOrRight(direction) {
      var self = this;
      this.dom.className = direction;

      var move = function move() {
        if (!self.living) {
          clearInterval(self.moveXId);
        }
        self.dom.style.left = self.dom.offsetLeft + self.movepx * (direction == "left" ? -1 : 1) + "px";

        if (self.dom.offsetLeft >= self.gamePanel.clientWidth - self.dom.clientWidth && direction == "right") {
          self.dom.style.left = self.gamePanel.clientWidth - self.dom.clientWidth + "px";
          clearInterval(self.moveXId);
          //player stops moving when it reaches left border
        } else if (self.dom.offsetLeft <= 0 && direction == "left") {
          self.dom.style.left = 0 + "px";
          clearInterval(self.moveXId);
        }
      };
      //start moving
      this.moveXId = setInterval(move, this.movesp);
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 3 */,
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

var _frost_block = __webpack_require__(10);

var _frost_block2 = _interopRequireDefault(_frost_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockGenerator = function () {
  function BlockGenerator(gamePanel, player) {
    _classCallCheck(this, BlockGenerator);

    this.gamePanel = gamePanel;
    this.player = player;
    this.allBlocks = [];
  }

  //randomly generate different kinds of blocks in random positions


  _createClass(BlockGenerator, [{
    key: "generateBlock",
    value: function generateBlock() {
      var prev_block = 0;
      var random = Math.floor(Math.random() * 12 + 1);
      var block = void 0;
      if (random <= 4) {
        block = new _brick_block2.default();
      } else if (random === 5 && prev_block === 5) {
        block = new _brick_block2.default();
      } else if (random === 6) {
        block = new _lava_block2.default();
      } else if (random === 7 || random === 8) {
        block = new _grass_block2.default();
      } else if (random === 9 || random === 10) {
        block = new _spring_block2.default();
      } else if (random === 11 || random === 12) {
        block = new _frost_block2.default();
      } else {
        return;
      }
      prev_block = random;
      var randomPosition = Math.floor(Math.random() * 15 + 1);
      this.addBlock(block, randomPosition);
      this.allBlocks.push(block);
    }

    //ensure the player have a easy time starting the game

  }, {
    key: "defaultBlock",
    value: function defaultBlock() {
      var block = new _brick_block2.default();
      this.addBlock(block, 8);
      this.allBlocks.push(block);
    }
  }, {
    key: "init",
    value: function init(gamePanel, player) {
      this.gamePanel = gamePanel;
      this.player = player;
    }
  }, {
    key: "addBlock",
    value: function addBlock(block, position) {
      var self = this;
      block.formBlock();
      block.onCheckPlayerOn = function () {
        return this.checkPlayerOn(self.player);
      };
      block.blockPosition(this.gamePanel, position);
      block.onPlayOn = function () {
        this.playerOn(self.player);
      };
      block.onCheckMoveOut = function () {
        this.checkMoveOut(self.player);
      };
      block.render();
    }
  }, {
    key: "stopBlock",
    value: function stopBlock() {
      var length = this.allBlocks.length;
      for (var i = 0; i < length; i++) {
        this.allBlocks[i].stopMove();
      }
    }
  }]);

  return BlockGenerator;
}();

exports.default = BlockGenerator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parent_block = __webpack_require__(9);

var _parent_block2 = _interopRequireDefault(_parent_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrickBlock = function (_ParentBlock) {
  _inherits(BrickBlock, _ParentBlock);

  function BrickBlock() {
    _classCallCheck(this, BrickBlock);

    var _this = _possibleConstructorReturn(this, (BrickBlock.__proto__ || Object.getPrototypeOf(BrickBlock)).call(this));

    _this.className = "brick";
    return _this;
  }

  _createClass(BrickBlock, [{
    key: "playerOn",
    value: function playerOn(player) {
      //player stops moving vertically
      player.clearMoveId(true);
      //player moves up with the same speed as block it's on
      player.moveUp(3, 35);
      this.render();
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
}(_parent_block2.default);

exports.default = BrickBlock;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parent_block = __webpack_require__(9);

var _parent_block2 = _interopRequireDefault(_parent_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GrassBlock = function (_ParentBlock) {
  _inherits(GrassBlock, _ParentBlock);

  function GrassBlock() {
    _classCallCheck(this, GrassBlock);

    var _this = _possibleConstructorReturn(this, (GrassBlock.__proto__ || Object.getPrototypeOf(GrassBlock)).call(this));

    _this.className = "grass";
    return _this;
  }

  _createClass(GrassBlock, [{
    key: "playerOn",
    value: function playerOn(player) {
      var _this2 = this;

      player.clearMoveId(true);
      player.moveUp(this.movepx, this.movesp);
      this.render();
      this.needCheckMove = true;
      setTimeout(function () {
        _this2.end();
        _this2.needCheckPlayerOn = true;
        player.clearMoveId(true);
        player.moveDown();
      }, 500);
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

  return GrassBlock;
}(_parent_block2.default);

exports.default = GrassBlock;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parent_block = __webpack_require__(9);

var _parent_block2 = _interopRequireDefault(_parent_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LavaBlock = function (_ParentBlock) {
  _inherits(LavaBlock, _ParentBlock);

  function LavaBlock() {
    _classCallCheck(this, LavaBlock);

    var _this = _possibleConstructorReturn(this, (LavaBlock.__proto__ || Object.getPrototypeOf(LavaBlock)).call(this));

    _this.className = "lava";
    return _this;
  }
  //player dies when it lands on it


  _createClass(LavaBlock, [{
    key: "playerOn",
    value: function playerOn(player) {
      player.clearMoveId(true);
      player.dead();
    }
  }]);

  return LavaBlock;
}(_parent_block2.default);

exports.default = LavaBlock;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parent_block = __webpack_require__(9);

var _parent_block2 = _interopRequireDefault(_parent_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpringBlock = function (_ParentBlock) {
  _inherits(SpringBlock, _ParentBlock);

  function SpringBlock() {
    _classCallCheck(this, SpringBlock);

    var _this = _possibleConstructorReturn(this, (SpringBlock.__proto__ || Object.getPrototypeOf(SpringBlock)).call(this));

    _this.className = "spring";
    return _this;
  }
  //player jumps


  _createClass(SpringBlock, [{
    key: "playerOn",
    value: function playerOn(player) {
      player.clearMoveId(true);
      player.jump();
      this.needCheckPlayerOn = true;
      this.render();
    }
  }]);

  return SpringBlock;
}(_parent_block2.default);

exports.default = SpringBlock;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParentBlock = function () {
  function ParentBlock() {
    _classCallCheck(this, ParentBlock);

    // this.dom = null;
    this.className = "";
    this.moveId = 0;
    this.needCheckMove = false;
    this.needCheckPlayerOn = true;
    this.movepx = 3;
    this.movesp = 35;
    this.gamePanel = null;
    this.site = {
      1: 0,
      2: 50,
      3: 100,
      4: 150,
      5: 200,
      6: 250,
      7: 300,
      8: 350,
      9: 400,
      10: 450,
      11: 500,
      12: 550,
      13: 600,
      14: 650,
      15: 700
    };
  }

  _createClass(ParentBlock, [{
    key: "formBlock",
    value: function formBlock() {
      this.dom = document.createElement("div");
      this.dom.className = this.className;
      this.dom.style.width = "60px";
      this.dom.style.height = "15px";
    }
  }, {
    key: "blockPosition",
    value: function blockPosition(gamePanel, type) {
      if (this.gamePanel === null) {
        this.gamePanel = gamePanel;
      }
      this.dom.style.left = this.site[type] + "px";
      this.dom.style.top = this.gamePanel.offsetHeight + "px";
      this.gamePanel.appendChild(this.dom);
    }
  }, {
    key: "render",
    value: function render() {
      var self = this;
      var animate = function animate() {
        if (self.dom === null) {
          return;
        }
        var top = self.dom.offsetTop - self.movepx;
        self.dom.style.top = top + "px";
        //checking if player is on the block
        var isPlayerOn = self.needCheckPlayerOn && self.onCheckPlayerOn();
        //checking if player moves on the block
        if (self.needCheckMove) {
          self.onCheckMoveOut();
        }
        //block is out of the dom and player is not on it, then it disappear
        if (top <= -self.dom.offsetHeight && !isPlayerOn) {
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
    //removes grassblock

  }, {
    key: "end",
    value: function end() {
      this.stopMove();
      this.gamePanel.removeChild(this.dom);
      this.dom = null;
    }
  }, {
    key: "checkPlayerOn",
    value: function checkPlayerOn(player) {
      if (player.isJumping) {
        return false;
      }

      var leftPlayerEle = player.dom.offsetLeft;
      var leftBlockEle = this.dom.offsetLeft;
      var playerEleWidth = player.dom.clientWidth;
      var blockEleWidth = this.dom.clientWidth;

      //check if player is within the block dom
      if (leftPlayerEle > leftBlockEle - playerEleWidth && leftPlayerEle < leftBlockEle + blockEleWidth) {
        //this checks if the player y cordinate is above the block as well as its next move's y cord
        if (player.dom.offsetTop + player.dom.clientHeight <= this.dom.offsetTop && player.dom.offsetTop + player.dom.clientHeight + player.movepy + player.gravity > this.dom.offsetTop - this.movepx) {
          player.dom.style.top = this.dom.offsetTop - player.dom.offsetHeight + "px";
          this.needCheckPlayerOn = false;
          return true;
        }
      }
      return false;
    }
  }]);

  return ParentBlock;
}();

exports.default = ParentBlock;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parent_block = __webpack_require__(9);

var _parent_block2 = _interopRequireDefault(_parent_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrostBlock = function (_ParentBlock) {
  _inherits(FrostBlock, _ParentBlock);

  function FrostBlock() {
    _classCallCheck(this, FrostBlock);

    var _this = _possibleConstructorReturn(this, (FrostBlock.__proto__ || Object.getPrototypeOf(FrostBlock)).call(this));

    _this.className = 'frost';
    return _this;
  }

  _createClass(FrostBlock, [{
    key: "playerOn",
    value: function playerOn(player) {
      player.clearMoveId(true);
      //player moves up with the same speed as block it's on
      player.moveUp(3, 25);
      this.render();
      this.needCheckMove = true;
    }
  }, {
    key: "render",
    value: function render() {
      var self = this;
      var animate = function animate() {
        if (self.dom === null) {
          return;
        }
        var top = self.dom.offsetTop - self.movepx;
        self.dom.style.top = top + "px";
        //checking if player is on the block
        var isPlayerOn = self.needCheckPlayerOn && self.onCheckPlayerOn();
        //checking if player moves on the block
        if (self.needCheckMove) {
          self.onCheckMoveOut();
        }
        //block is out of the dom and player is not on it, then it disappear
        if (top <= -self.dom.offsetHeight && !isPlayerOn) {
          self.end();
        } else if (isPlayerOn) {
          //excute block effects accordingly
          self.stopMove();
          self.onPlayOn();
        }
      };
      this.moveId = setInterval(animate, 25);
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

  return FrostBlock;
}(_parent_block2.default);

exports.default = FrostBlock;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map