class Player {
  constructor() {
    this.dom = null;
    //player's vertical moving speed
    this.speedY = 0;
    this.isMoving = false;
    //player's horizontal moving speed
    this.moveXId = 0;
    this.moveYid = 0;
    this.isLive = true;
    this.isFlip = false;
    this.gamePanel = null;
    this.elasticity = 0.8;
    this.gravity = 1;
    this.speedX = 8;
    this.defaultSpeedY = 1;
    this.movesp = 40;
    this.dom = document.createElement("div");
    this.dom.className = "player";
    this.speedY = this.defaultSpeedY;
  }

  setPosition(gamePanel) {
    this.gamePanel = gamePanel;
    this.gamePanel.appendChild(this.dom);
    this.dom.style.left =
      (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + "px";
    this.dom.style.top = 70 + "px";
  }

  //moves left or right according to which key is pressed
  keyDown(e) {
    if (this.isMove) {
      return;
    }
    this.isMove = true;
    const dir = e.key === "ArrowLeft" ? "left" : "right";
    this.moveLeftOrRight(dir);
  }

  //once key is released, it stops moving
  keyUp(e) {
    this.isMoving = false;
    clearInterval(this.moveXId);
    this.dom.className = "player";
  }

  moveLeftOrRight(direction) {
    console.log(direction);
    let self = this;
    this.dom.className = direction;
    const move = () => {
      if (self.isLive === false) {
        clearInterval(self.moveXId);
      }
      self.dom.style.left =
        self.dom.offsetLeft +
        self.speedX * (direction === "left" ? -1 : 1) +
        "px";

      if (
        self.dom.offsetLeft >=
          self.gamePanel.clientWidth - self.dom.clientWidth &&
        direction === "right"
      ) {
        self.dom.style.left =
          self.gamePanel.clientWidth - self.dom.clientWidth + "px";
        clearInterval(self.moveXId);
      } else if (self.dom.offsetLeft <= 0 && direction === "left") {
        self.dom.style.left = 0 + "px";
        clearInterval(self.moveXId);
      }
    };
    this.moveXId = setInterval(move, this.movesp);
  }

  moveDown() {
    let self = this;
    const move = () => {
      self.dom.style.top = self.dom.offsetTop + self.speedY + "px";
      self.speedY += self.gravity;
      if (self.checkCrash()) {
        self.dead();
      }
    };
    self.moveYID = setInterval(move, this.movesp);
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
      initialFlipSpeed *= self.elasticity;
      self.dom.style.top = self.dom.offsetTop - initialFlipSpeed + "px";
      if (self.checkCrash()) {
        self.dead();
      } else if (initialFlipSpeed < 1) {
        self.isFlip = false;
        self.speedY = self.defaultSpeedY;
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
        this.gamePanel.offsetHeigt - this.dom.clientheight ||
      this.dom.offsetTop <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  clearMoveId(speedY) {
    clearInterval(this.moveYId);
    if (speedY) {
      this.speedY = this.defaultSpeedY;
    }
  }

  dead() {
    this.isLive = false;
    this.gameOver();
    this.clearMoveId();
  }
}

export default Player;
