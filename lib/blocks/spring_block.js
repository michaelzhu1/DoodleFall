import BlockBase from "./blockbase";

class SpringBlock extends BlockBase {
  constructor() {
    super();
    this.className = "spring";
  }
  playOn(player) {
    player.clearMoveId(true);
    player.flip();
    this.needCheckPlayerOn = true;
    this.animation();
  }
}

export default SpringBlock;
