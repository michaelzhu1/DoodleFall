import BrickBlock from "./brick_block";
import GrassBlock from "./grass_block";
import LavaBlock from "./lava_block";
import SpringBlock from "./spring_block";
import FrostBlock from "./frost_block";

class BlockGenerator {
  constructor(gamePanel, player) {
    this.gamePanel = gamePanel;
    this.player = player;
    this.allBlocks = [];
  }

  //randomly generate different kinds of blocks in random positions
  generateBlock() {
    let prev_block = 0;
    const random = Math.floor(Math.random() * 12 + 1);
    let block;
    if (random <= 4) {
      block = new BrickBlock();
    } else if (random === 5 && prev_block === 5) {
      block = new BrickBlock();
    } else if (random === 6) {
      block = new LavaBlock();
    } else if (random === 7 || random === 8) {
      block = new GrassBlock();
    } else if (random === 9 || random === 10) {
      block = new SpringBlock();
    } else if (random === 11 || random === 12) {
      block = new FrostBlock();
    } else {
      return;
    }
    prev_block = random;
    const randomPosition = Math.floor(Math.random() * 9 + 1);
      this.addBlock(block, randomPosition);
      this.allBlocks.push(block);
  }

  //ensure the player have a easy time starting the game
  defaultBlock() {
    let block = new BrickBlock();
    this.addBlock(block, 6);
    this.allBlocks.push(block);
  }

  init(gamePanel, player) {
    this.gamePanel = gamePanel;
    this.player = player;
  }

  addBlock(block, position) {
    let self = this;
    block.formBlock();
    block.onCheckPlayerOn = function() {
      return this.checkPlayerOn(self.player);
    };
    block.blockPosition(this.gamePanel, position);
    block.onPlayOn = function() {
      this.playerOn(self.player);
    };
    block.onCheckMoveOut = function() {
      this.checkMoveOut(self.player);
    };
    block.render();
  }

  stopBlock() {
    const length = this.allBlocks.length;
    for (let i = 0; i < length; i++) {
      this.allBlocks[i].stopMove();
    }
  }
}

export default BlockGenerator;
