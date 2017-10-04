class BlockBase {
  constructor() {
    this.dom = null;
    this.className = "";
    this.moveId = 0;
    this.needCheckMove = false;
    this.needCheckPlayerOn = true;
    this.movepx = 3;
    this.movesp = 35;
    this.gamePanel = null;
    this.site = {
      1: 0,
      2: 55,
      3: 110,
      4: 165,
      5: 220
    };
    this.dom = document.createElement("div");
    this.dom.className = this.className;
    this.dom.style.width = "80px";
    this.dom.style.height = "10px";
  }
  init() {
    this.dom = document.createElement("div");
    this.dom.className = this.className;
    this.dom.style.width = "80px";
    this.dom.style.height = "10px";
  }

  setPosition(gamePanel, type) {
    if (this.gamePanel === null) {
      this.gamePanel = gamePanel;
    }
    this.dom.style.left = this.site[type] + "px";
    this.dom.style.top = this.gamePanel.offsetHeight + "px";
    this.gamePanel.appendChild(this.dom);
  }

  animation() {
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

  end() {
    this.stopMove();
    this.gamePanel.removeChild(this.dom);
    this.dom = null;
    this.onEnd();
  }

  checkPlayerOn(player) {
    if (player.isFlip) {
      return false;
    }
    let playerDom = player.dom;
    let blockDom = this.dom;

    //check if player is within the block dom
    if (
      playerDom.offsetLeft > blockDom.offsetLeft - playerDom.clientWidth &&
      playerDom.offsetLeft < blockDom.offsetLeft + blockDom.clientWidth
    ) {
      //this checks if the player y cordinate is above the block as well as its next move's y cord
      if (
        playerDom.offsetTop + playerDom.clientHeight <= blockDom.offsetTop &&
        playerDom.offsetTop +
          playerDom.clientHeight +
          player.movepy +
          player.g >
          blockDom.offsetTop - this.movepx
      ) {
        playerDom.style.top =
          blockDom.offsetTop - playerDom.offsetHeight + "px";
        this.needCheckPlayerOn = false;
        return true;
      }
    }
    return false;
  }

  // checkMoveOut(player) {}
  //
  // playOn(player) {}
  // onCheckMoveOut() {}
  // onCheckPlayerOn() {}
  // onPlayOn() {}
}

export default BlockBase;
