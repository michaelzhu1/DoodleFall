import ParentBlock from "./parent_block";

class BrickBlock extends ParentBlock {
  constructor() {
    super();
    this.className = "brick";
  }

  playerOn(player) {
    //player stops moving vertically
    player.clearMoveId(true);
    //player moves up with the same speed as block it's on
    player.moveUp(3, 35);
    this.render();
    this.needCheckMove = true;
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

export default BrickBlock;
