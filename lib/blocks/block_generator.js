import BrickBlock from "./brick_block";
import GrassBlock from "./grass_block";
import LavaBlock from "./lava_block";
import SpringBlock from "./spring_block";
import BlockBase from "./blockbase";

class BlockGenerator extends BlockBase {
  constructor(gamePanel, player) {
    super();
    this.gamePanel = gamePanel;
    this.player = player;
    this.blockList = [];
  }

  //randomly generate different kinds of blocks in random positions
  generateBlock() {
    const random = Math.floor(Math.random() * 11 + 1);
    let block;
    if (random === 5) {
      block = new BrickBlock();
    } else if (random === 7) {
      block = new BrickBlock();
    } else if (random === 9) {
      block = new BrickBlock();
    } else if (random === 11) {
      block = new BrickBlock();
    } else {
      return;
    }
    const randomPosition = Math.floor(Math.random() * 5 + 1);
    console.log(block);
    this.setBlock(block, randomPosition);
  }

  //ensure the player have a easy time starting the game
  defaultBlock() {
    let block = new BrickBlock();
    this.setBlock(block, 5);
  }

  // init(gamePanel, player) {
  //   this.gamePanel = gamePanel;
  //   this.player = player;
  // }

  setBlock(block, position) {
    let self = this;
    block.init();
    block.setPosition(this.gamePanel, position);
    block.onCheckPlayerOn = function() {
      return this.checkPlayerOn(self.player);
    };
    block.onPlayOn = () => {
      this.playOn(self.player);
    };
    block.onCheckMoveOut = () => {
      this.checkMoveOut(self.player);
    };
    block.onEnd = () => {
      self.blockList.remove(this);
    };
    block.animation();
    this.blockList.push(block);
  }

  stopBlock() {
    for (let i = 0; i < this.blockList.length; i++) {
      this.blockList[i].stopMove();
    }
  }

  clearBlock() {
    for (let i = 0; i < this.blockList.length; i++) {
      let block = this.blockList[i].pop();
      this.gamePanel.removeChild(block.dom);
      block.dom = null;
      block = null;
    }
  }
}

Array.prototype.remove = function(obj) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] == obj || this[i].dom == null) {
      this.splice(i, 1);
      break;
    }
  }
  return this;
};

export default BlockGenerator;
