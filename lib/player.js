class Player {
  constructor() {
    this.health = 100;
    this.dom = null;
    //player's vertical moving speed
    this.moveYSpeed = 0;
    //player's horizontal moving speed
    this.moveXSpeed = 8;
    this.moveXId = 0;
    this.moveYid = 0;
    this.isMoving = false;
    this.isLive = true;
    this.gamePanel = null;
    this.elasticity = 0.8;
    this.gravity = 1;
    this.defaultMoveYSpeed = 1;
    this.moveFrame = 40;
  }

  setPosition(gamePanel) {
    this.dom = document.createElement("div");
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
        self.movepx * (direction === "left" ? -1 : 1) +
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
      self.dom.style.top = self.dom.offsetTop + self.movepy + "px";
      self.movepy += self.g;
      if (self.checkCrash()) {
        self.dead();
      }
    };
    self.moveYID = setInterval(move, this.movesp);
  }

  moveUp(b_movepx, b_movesp) {
    let self = this;
    const move = () => {
      self.dom.style.top = self.dom.offsetTop - b_movesp + "px";
      if (self.checkCrash()) {
        self.dead();
      }
    };
    this.moveYId = setInterval(move, b_movesp);
  }

  flip() {}

  checkCrash() {}

  dead() {
    this.isLive = false;
    this.gameOver();
  }
}

export default Player;
