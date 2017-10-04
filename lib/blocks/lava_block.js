import BlockBase from "./blockbase";

class LavaBlock extends BlockBase {
  constructor() {
    super();
    this.className = "lava";
  }
  //player dies when it lands on it
  playOn(player) {
    player.clearMoveId(true);
    player.dead();
  }
}

export default LavaBlock;
