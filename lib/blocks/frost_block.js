import ParentBlock from "./parent_block";

class FrostBlock extends ParentBlock {
  constructor() {
    super();
    this.className = 'frost';
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
      let top = self.dom.offsetTop - self.movepx;
      self.dom.style.top = top + "px";
      //checking if player is on the block
      let isPlayerOn = self.needCheckPlayerOn && self.onCheckPlayerOn();
      //checking if player moves on the block
      if (self.needCheckMove) {
        self.onCheckMoveOut();
      }
      //block is out of the dom and player is not on it, then it disappear
      if (top <= -self.dom.offsetHeight && !isPlayerOn) {
        self.end();
      } else if (isPlayerOn) {
        //excute block effects accordingly
        self.stopMove();
        self.onPlayOn();
      }
    };
    this.moveId = setInterval(animate, 25);
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

export default FrostBlock;
