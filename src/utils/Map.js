import Room from './Room';
import Corridor from './Corridor';

class Map{
  constructor(mapProp, dungeonProp){
    this.updateProperties(mapProp, dungeonProp);
  }

  updateProperties(mapProp, dungeonProp){
    this.tileSize= mapProp.tileSize;
    this.rows = mapProp.rows;
    this.columns = mapProp.columns;
    this.numberOfRooms = mapProp.numRooms.random();
    this.numberOfCorridors = this.numberOfRooms - 1;
    this.roomWidthRange = mapProp.roomWidth;
    this.roomHeightRange = mapProp.roomHeight;
    this.corridorLengthRange = mapProp.corridorLength;
    this.rooms = [];
    this.corridors = [];

    this.floor =  dungeonProp.floor;
    this.weakMonsters = dungeonProp.weakMonsters.random();
    this.normalMonsters = dungeonProp.normalMonsters.random();
    this.strongMonsters = dungeonProp.strongMonsters.random();
    this.potions = dungeonProp.numberOfPotions.random();
  }

  createMap(){
    //create the first room and corridor
    this.rooms.push(new Room(this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, this.tileSize));
    this.corridors.push(new Corridor(this.rooms[0], this.corridorLengthRange, this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, true));
    this.rooms[0].createRoom(0);
    this.corridors[0].createCorridor();
    for (let i=1; i<this.numberOfRooms; i++){
      this.rooms[i] = new Room(this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, this.tileSize, this.corridors[i-1]);
      this.rooms[i].createRoom(i);
      if (i < this.numberOfCorridors){
        this.corridors[i] = new Corridor(this.rooms[i], this.corridorLengthRange, this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, false)
        this.corridors[i].createCorridor();
      }
    }
    this.generateMonsters();
    this.generateItems();
    if (this.floor > -3){
      this.generatePortal();
    }
    this.spawnPlayer();
  }

  generateMonsters(){
    for (let i=0; i<this.weakMonsters; i++){
      var index = Math.floor(Math.random() * this.rooms.length);
      var cells = document.querySelectorAll(`.room${index}`);
      if (cells.length > 3) {
        index = Math.floor(Math.random() * cells.length);
        cells[index].className += ' monster monster_1';
      }
    }
    for (let i=0; i<this.normalMonsters; i++){
      var index = Math.floor(Math.random() * this.rooms.length);
      var cells = document.querySelectorAll(`.room${index}`);
      if (cells.length > 3) {
        index = Math.floor(Math.random() * cells.length);
        if (cells[index].classList.contains('monster')){
          i--;
        } else {
          cells[index].className += ' monster monster_2';
        }
      }
    }
    for (let i=0; i<this.strongMonsters; i++){
      var index = Math.floor(Math.random() * this.rooms.length);
      var cells = document.querySelectorAll(`.room${index}`);
      if (cells.length > 3) {
        index = Math.floor(Math.random() * cells.length);
        if (cells[index].classList.contains('monster')){
          i--;
        } else {
          cells[index].className += ' monster monster_3';
        }
      }
    }
  }

  generateItems(){
    for (let i=0; i<this.potions; i++){
      var index = Math.floor(Math.random() * this.rooms.length);
      var cells = document.querySelectorAll(`.room${index}`);
      if (cells.length > 0 ){
        for (let n=0; n<cells.length; n++){
          index = Math.floor(Math.random() * cells.length);
          if (!cells[index].classList.contains('monster')){
            cells[index].className += ' item potion';
            break;
          }
        }
      }
    }
  }

  generatePortal(){
    console.log('generate portal');
    while (true){
      var index = Math.floor(Math.random() * this.rooms.length);
      var cells = document.querySelectorAll(`.room${index}`);
      if (cells.length > 0 ){
        for (let n=0; n<cells.length; n++){
          index = Math.floor(Math.random() * cells.length);
          if (!cells[index].classList.contains('monster') && !cells[index].classList.contains('item')){
            cells[index].className += ' stair';
            return;
          }
        }
      }
    }
  }

  spawnPlayer(){
    //May not need these tests as player on the outer layer
    var roomIndex = this.rooms.findIndex((room, i) => {
      var cells = document.querySelectorAll(`.room${i}`);
      return [...cells].some((cell) => {
        if (!cell.classList.contains('monster') && !cell.classList.contains('item') && !cell.classList.contains('stair')) return true;
      })
    });
    var cells = document.querySelectorAll(`.room${roomIndex}`);
    cells = [...cells].filter((cell) => {
      if (cell.classList.contains('monster')||cell.classList.contains('item')||cell.classList.contains('stair')) return false;
      return true;
    });
    var cellIndex = Math.floor(Math.random() * cells.length);
    var left = cells[cellIndex].id % 90;
    var top = (cells[cellIndex].id - left)/90;
    var player = document.getElementById('player');
    if (player){
      player.parentNode.removeChild(player);
    }
    player = document.createElement('div');
    player.id = 'player';
    player.setAttribute('style', `left:${left*this.tileSize}px; top:${top*this.tileSize}px`);
    document.getElementById('map').appendChild(player);
  }
}

export default Map;
