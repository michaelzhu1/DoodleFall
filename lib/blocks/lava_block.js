import ParentBlock from "./parent_block";

class LavaBlock extends ParentBlock {
  constructor() {
    super();
    this.className = "lava";
  }
  //player dies when it lands on it
  playerOn(player) {
    player.clearMoveId(true);
    player.dead();
    alert("Game Over");

  }
}

export default LavaBlock;
