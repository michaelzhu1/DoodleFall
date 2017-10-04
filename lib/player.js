class Player {
  constructor() {
    this.dom = null;
    //player's vertical moving speed
    this.movepy = 0;
    //player's horizontal moving speed
    this.movepx = 8;
    this.isMove = false;
    this.moveXId = 0;
    this.moveYId = 0;
    this.isLive = true;
    this.isFlip = false;
    this.gamePanel = null;
    this.k = 0.8;
    this.g = 1;
    this.defaultSpeed = 1;
    this.movesp = 35;
    this.dom = document.createElement("div");
    this.dom.className = "player";
    this.movepy = this.defaultSpeed;
  }

  setPosition(gamePanel) {
    this.gamePanel = gamePanel;
    this.gamePanel.appendChild(this.dom);
    this.dom.style.left =
      (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + "px";
    this.dom.style.top = 70 + "px";
  }

  //moves left or right according to which key is pressed
  keydown(e) {
    if (this.isMove) {
      return;
    }
    this.isMove = true;
    this.moveLeftRight(e.key == "ArrowLeft" ? "left" : "right");
  }

  //once key is released, it stops moving
  keyup(e) {
    this.isMove = false;
    clearInterval(this.moveXId);
    this.dom.className = "player";
  }

  moveLeftRight(direction) {
    let self = this;
    this.dom.className = direction;

    const move = () => {
      if (!self.isLive) {
        clearInterval(self.moveXId);
      }
      self.dom.style.left =
        self.dom.offsetLeft +
        self.movepx * (direction == "left" ? -1 : 1) +
        "px";

      if (
        self.dom.offsetLeft >=
          self.gamePanel.clientWidth - self.dom.clientWidth &&
        direction == "right"
      ) {
        self.dom.style.left =
          self.gamePanel.clientWidth - self.dom.clientWidth + "px";
        clearInterval(self.moveXId);
        //player stops moving when it reaches left border
      } else if (self.dom.offsetLeft <= 0 && direction == "left") {
        self.dom.style.left = 0 + "px";
        clearInterval(self.moveXId);
      }
    };
    //start moving
    this.moveXId = setInterval(move, this.movesp);
  }

  moveDown() {
    let self = this;
    const move = () => {
      self.dom.style.top = self.dom.offsetTop + self.movepy + "px";
      //vertical speed + g
      self.movepy += self.g;
      if (self.checkCrash()) {
        self.dead();
      }
    };
    self.moveYId = setInterval(move, this.movesp);
  }

  moveUp(moveUpSpeed, moveUpFreq) {
    let self = this;
    const move = () => {
      self.dom.style.top = self.dom.offsetTop - moveUpSpeed + "px";
      if (self.checkCrash()) {
        self.dead();
      }
    };
    this.moveYId = setInterval(move, moveUpFreq);
  }

  flip() {
    if (this.isFlip) {
      return;
    }
    this.isFlip = true;
    let self = this;
    let initialFlipSpeed = 25;
    const move = () => {
      initialFlipSpeed *= self.k;
      self.dom.style.top = self.dom.offsetTop - initialFlipSpeed + "px";
      if (self.checkCrash()) {
        self.dead();
      } else if (initialFlipSpeed < 1) {
        self.isFlip = false;
        self.movepy = self.defaultSpeed;
        self.moveDown();
      } else {
        setTimeout(move, self.movesp);
      }
    };
    setTimeout(move, self.movesp);
  }

  checkCrash() {
    if (
      this.dom.offsetTop >=
        this.gamePanel.offsetHeight - this.dom.clientHeight ||
      this.dom.offsetTop <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  clearMoveId(movepy) {
    clearInterval(this.moveYId);
    if (movepy) {
      this.movepy = this.defaultSpeed;
    }
  }

  dead() {
    this.isLive = false;
    this.gameOver();
    this.clearMoveId(true);
  }

  gameOver() {}
}

export default Player;
