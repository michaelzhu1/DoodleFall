import BrickBlock from "./brick_block";
import GrassBlock from "./grass_block";
import LavaBlock from "./lava_block";
import SpringBlock from "./spring_block";

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
       block = new BrickBlock();
    } else if (random === 7){
       block = new GrassBlock();
    } else if (random === 9){
       block = new SpringBlock();
    } else if (random === 11) {
       block = new LavaBlock();
    }
    const randomPosition = Math.floor(Math.random() * 5 + 1);
    this.setBlock(block, randomPosition);
  }

  //ensure the player have a easy time starting the game
  defaultBlock() {
    let block = new BrickBlock();
    this.setBlock(block, 3);
  }

}
