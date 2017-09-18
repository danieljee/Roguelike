
class Logic{
  constructor(config){
    this.config = config;
    this.keyState = {};
    document.addEventListener('keydown', (e) => {
      this.keyState[e.keyCode || e.which] = true;
    });
    document.addEventListener('keyup', (e) => {
      this.keyState[e.keyCode || e.which] = false;
    });
    this.player = document.getElementsByClassName('player')[0];
    this.playerKeyEventHandler();
  }

  playerKeyEventHandler(){
    var tileSize = this.config.tileSize;
    if (this.keyState[65]){
      if (this.hasObject(this.player.id-1)){

      } else {
        document.getElementById(this.player.id-1).classList.add('player');
        this.player.classList.remove('player');
      }
    }
    if (this.keyState[68]){
    }
    if (this.keyState[87]){
    }
    if (this.keyState[83]){
    }
    setTimeout(this.playerKeyEventHandler.bind(this), 100);
  }

  hasObject(id){
    const grid = document.getElementById(id);
    if(grid.classList.contains('wall') || grid.classList.contains('monster')){
      return true;
    }
    return false;
  }
}

export default Logic;
