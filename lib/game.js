import Player from "./player";
import Blockbase from "./blocks/blockbase";
import BlockGenerator from "./blocks/block_generator";

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
    this.player = new Player();
    this.player.setPosition(this.gamePanel);
    this.player.gameOver = () => { Game.gameOver();};
    this.player.moveDown();
  }
  //initialize blocks
  startBlock() {
    this.block = new Blockbase();
    let that = this;
    const time = 1100;
    BlockGenerator.init(this.gamePanel, this.player);
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
    BlockGenerator.stopBlock();
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

export default Game;
