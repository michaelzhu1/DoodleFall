import BlockBase from "./blockbase";

class BrickBlock extends BlockBase {
  constructor() {
    super();
    this.className = "brick";
  }

  playOn(player) {
    //player stops moving vertically
    player.clearMoveId(true);
    //player moves up with the same speed as block it's on
    player.moveUp(3, 35);
    this.animation();
    this.needCheckMove = true;
  }

  checkMoveOut(player) {
    let playerDom = player.dom;
    let blockDom = this.dom;

    //when player moves out of the block
    if (
      playerDom.offsetLeft <= blockDom.offsetLeft - playerDom.clientWidth ||
      playerDom.offsetLeft >= blockDom.offsetLeft + blockDom.clientWidth
    ) {
      //player moves downward
      player.clearMoveId(true);
      player.moveDown();
      this.needCheckMove = false;
      this.needCheckPlayerOn = true;
    }
  }
}

export default BrickBlock;
