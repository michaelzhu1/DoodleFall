class ParentBlock {
  constructor() {
    // this.dom = null;
    this.className = "";
    this.moveId = 0;
    this.needCheckMove = false;
    this.needCheckPlayerOn = true;
    this.movepx = 3;
    this.movesp = 35;
    this.gamePanel = null;
    this.site = {
      1: 0,
      2: 50,
      3: 100,
      4: 150,
      5: 200,
      6: 250,
      7: 300,
      8: 350,
      9: 400,
      10: 450
    };
    this.dom = document.createElement("div");
    this.dom.className = this.className;
    this.dom.style.width = "60px";
    this.dom.style.height = "15px";
  }
  formBlock() {
    this.dom = document.createElement("div");
    this.dom.className = this.className;
    this.dom.style.width = "60px";
    this.dom.style.height = "15px";
  }

  blockPosition(gamePanel, type) {
    if (this.gamePanel === null) {
      this.gamePanel = gamePanel;
    }
    this.dom.style.left = this.site[type] + "px";
    this.dom.style.top = this.gamePanel.offsetHeight + "px";
    this.gamePanel.appendChild(this.dom);
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
    this.moveId = setInterval(animate, this.movesp);
  }

  stopMove() {
    clearTimeout(this.moveId);
  }
  //removes grassblock
  end() {
    this.stopMove();
    this.gamePanel.removeChild(this.dom);
    this.dom = null;
    this.onEnd();
  }

  onEnd() {}

  checkPlayerOn(player) {
    if (player.isJumping) {
      return false;
    }
    // let playerDom = player.dom;
    // let blockDom = this.dom;

    let leftPlayerEle = player.dom.offsetLeft;
    let leftBlockEle = this.dom.offsetLeft;
    let playerEleWidth = player.dom.clientWidth;
    let blockEleWidth = this.dom.clientWidth;

    //check if player is within the block dom
    if (
      leftPlayerEle > leftBlockEle - playerEleWidth &&
      leftPlayerEle < leftBlockEle + blockEleWidth
    ) {
      //this checks if the player y cordinate is above the block as well as its next move's y cord
      if (
        player.dom.offsetTop + player.dom.clientHeight <= this.dom.offsetTop &&
        player.dom.offsetTop +
          player.dom.clientHeight +
          player.movepy +
          player.gravity >
          this.dom.offsetTop - this.movepx
      ) {
        player.dom.style.top =
          this.dom.offsetTop - player.dom.offsetHeight + "px";
        this.needCheckPlayerOn = false;
        return true;
      }
    }
    return false;
  }
}

export default ParentBlock;
