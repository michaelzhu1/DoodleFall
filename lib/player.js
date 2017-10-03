class Player {
  constructor() {
    this.health = 100;
    this.dom = document.createElement('div');
    this.isMoving = false;
  }
  setPosition(gamePanel) {
    this.gamePanel = gamePanel;
    this.gamePanel.appendChild(this.dom);
    this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + 'px';
    this.dom.style.top = 70 + 'px';
  }

  moveLeftOrRight() {

  }

  keyDown() {

  }

  keyUp() {

  }



}


export default Player;
