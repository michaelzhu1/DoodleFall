import ParentBlock from "./parent_block";

class SpringBlock extends ParentBlock {
  constructor() {
    super();
    this.className = "spring";
  }
  //player jumps
  playerOn(player) {
    player.clearMoveId(true);
    player.jump();
    this.needCheckPlayerOn = true;
    this.render();
  }
}

export default SpringBlock;
