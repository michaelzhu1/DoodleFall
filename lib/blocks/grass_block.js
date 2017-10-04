import BlockBase from "./blockbase";

class GrassBlock extends BlockBase {
  constructor() {
    super();
    this.className = "grass";
  }

  playOn(player) {
    player.clearMoveId(true);
    player.moveUp(this.movepx, this.movesp);
    this.animation();
    this.needCheckMove = true;
    setTimeout(() => {
      this.end();
      this.needCheckPlayerOn = true;
      player.clearMoveId(true);
      player.moveDown();
    }, 500);
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

export default GrassBlock;
