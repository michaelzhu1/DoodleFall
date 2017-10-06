class Player {
  constructor() {
    // this.dom = null;
    //player's vertical moving speed
    this.ySpeed = 0;
    //player's horizontal moving speed
    this.xSpeed = 8;
    this.elasticity = 0.6;
    this.gravity = 1;
    this.defaultSpeed = 1;
    this.playerRenderFreq = 35;
    this.dom = document.createElement("div");
    this.dom.className = "player";
    this.ySpeed = this.defaultSpeed;
    this.isMove = false;
    this.xMovement = 0;
    this.yMovement = 0;
    this.living = true;
    this.isJumping = false;
    this.gamePanel = null;
  }

  blockPosition(gamePanel) {
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
    this.moveLeftOrRight(e.key == "ArrowLeft" ? "left" : "right");
  }

  //once key is released, it stops moving
  keyup(e) {
    this.isMove = false;
    clearInterval(this.xMovement);
    this.dom.className = "player";
  }

  moveDown() {
    let self = this;
    const move = () => {
      self.dom.style.top = self.dom.offsetTop + self.ySpeed + "px";
      //vertical speed + gravity
      self.ySpeed += self.gravity;
      if (self.isAlive()) {
        self.dead();
      }
    };
    self.yMovement = setInterval(move, this.playerRenderFreq);
  }

  moveUp(moveUpSpeed, moveUpFreq) {
    let self = this;
    const move = () => {
      self.dom.style.top = self.dom.offsetTop - moveUpSpeed + "px";
      if (self.isAlive()) {
        self.dead();
      }
    };
    this.yMovement = setInterval(move, moveUpFreq);
  }

  jump() {
    if (this.isJumping) {
      return;
    }
    this.isJumping = true;
    let self = this;
    let initialJumpSpeed = 25;
    const move = () => {
      initialJumpSpeed *= self.elasticity;
      self.dom.style.top = self.dom.offsetTop - initialJumpSpeed + "px";
      if (self.isAlive()) {
        self.dead();
      } else if (initialJumpSpeed < 1) {
        //set the vertical speed back to default and move down
        self.isJumping = false;
        self.ySpeed = self.defaultSpeed;
        self.moveDown();
      } else {
        setTimeout(move, self.playerRenderFreq);
      }
    };
    setTimeout(move, self.playerRenderFreq);
  }

  dead() {
    this.living = false;
    this.gameOver();
    this.clearMoveId(true);
  }
  clearMoveId(ySpeed) {
    clearInterval(this.yMovement);
    if (ySpeed) {
      this.ySpeed = this.defaultSpeed;
    }
  }
  isAlive() {
    if (
      this.dom.offsetTop >=
        this.gamePanel.offsetHeight - this.dom.clientHeight ||
      this.dom.offsetTop <= 40
    ) {
      return true;
    } else {
      return false;
    }
  }

  gameOver() {}

  moveLeftOrRight(direction) {
    let self = this;
    this.dom.className = direction;

    const move = () => {
      if (!self.living) {
        clearInterval(self.xMovement);
      }
      self.dom.style.left =
        self.dom.offsetLeft +
        self.xSpeed * (direction == "left" ? -1 : 1) +
        "px";

      if (
        self.dom.offsetLeft >=
          self.gamePanel.clientWidth - self.dom.clientWidth &&
        direction == "right"
      ) {
        self.dom.style.left =
          self.gamePanel.clientWidth - self.dom.clientWidth + "px";
        clearInterval(self.xMovement);
        //player stops moving when it reaches left border
      } else if (self.dom.offsetLeft <= 0 && direction == "left") {
        self.dom.style.left = 0 + "px";
        clearInterval(self.xMovement);
      }
    };
    //start moving
    this.xMovement = setInterval(move, this.playerRenderFreq);
  }
}

export default Player;
