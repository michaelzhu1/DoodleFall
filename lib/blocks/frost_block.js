import ParentBlock from "./parent_block";

class FrostBlock extends ParentBlock {
  constructor() {
    super();
    this.className = "frost";
  }

  playerOn(player) {
    player.clearMoveId(true);
    //player moves up with the same speed as block it's on
    player.moveUp(3, 25);
    this.render();
    this.needCheckMove = true;
  }

  render() {
    let self = this;
    const animate = () => {
      if (self.dom === null) {
        return;
      }
      let top = self.dom.offsetTop - self.blockYSpeed;
      self.dom.style.top = top + "px";
      //checking if player is on the block
      let isPlayerOn = self.needCheckPlayerOn && self.onCheckPlayerOn();
      //checking if player moves on the block
      if (self.needCheckMove) {
        self.onCheckMoveOut();
      }
      //block is out of the dom and player is not on it, then it disappear
      if (isPlayerOn) {
        //excute block effects accordingly
        self.stopMove();
        self.onPlayOn();
      }
    };
    this.moveId = setInterval(animate, 25);
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

export default FrostBlock;
