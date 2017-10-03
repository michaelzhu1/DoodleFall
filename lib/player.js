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
  init() {
    this.dom = document.createElement('div');

  }

  setPosition(gamePanel) {
    this.gamePanel = gamePanel;
    this.gamePanel.appendChild(this.dom);
    this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + 'px';
    this.dom.style.top = 70 + 'px';
  }

  moveLeftOrRight(direction) {
    let self = this;
    this.dom.className = direction;
    const move = () =>{
      if (self.isLive === false) {

      }
    }
  }

  //moves left or right according to which key is pressed
  keyDown(e) {
    if (this.isMove) {
      return;
    }
    this.isMove = true;
    const dir = e.key === 37 ? "left" : "right" ;
    this.moveLeftOrRight(dir);
  }

  //once key is released, it stops moving
  keyUp(e) {
    this.isMoving = false;
    clearInterval(this.moveXId);
  }




}


export default Player;
