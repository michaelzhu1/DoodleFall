import ParentBlock from "./parent_block";

class GrassBlock extends ParentBlock {
  constructor() {
    super();
    this.className = "grass";
  }

  playerOn(player) {
    player.clearMoveId(true);
    player.moveUp(this.blockYSpeed, this.blockRenderFreq);
    this.render();
    this.needCheckMove = true;
    setTimeout(() => {
      this.end();
      this.needCheckPlayerOn = true;
      player.clearMoveId(true);
      player.moveDown();
    }, 500);
  }

  checkMoveOut(player) {
    let playerDom = player.dom.offsetLeft;
    let blockDom = this.dom.offsetLeft;
    let playerDomWidth = player.dom.clientWidth;
    let blockDomWidth = this.dom.clientWidth;

    //when player moves out of the block
    if (
      playerDom <= blockDom - playerDomWidth ||
      playerDom >= blockDom + blockDomWidth
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
