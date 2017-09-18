import Room from './Room';
import Corridor from './Corridor';

class Map{
  constructor(mapProp){
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
    // window.createRoom = this.createRoom.bind(this);
    // window.createCorridor = this.createCorridor.bind(this);
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
    this.spawnPlayer();
  }

  generateMonsters(){
    for(var i=0; i<this.rooms.length; i++){
      var cells = document.querySelectorAll(`.room${i}`);
      var mobChance = cells.length / 100;
      for (var monsterLevel=1; monsterLevel<=3; monsterLevel++){
        for(var n=0; n<cells.length; n++){
          if (Math.random() * (10*monsterLevel) < mobChance){
            cells[n].classList.add('monster');
            cells[n].classList.add(`monster_${monsterLevel}`);
          }
        }
        cells = [...cells].filter((cell)=>{ //create a new array without monster_weak
          if (cell.classList.contains('monster')) return false;
          return true;
        })
      }
    }
  }

  generateItems(){

  }

  spawnPlayer(){
    var roomIndex = this.rooms.findIndex((room, i) => {
      var cells = document.querySelectorAll(`.room${i}`);
      return [...cells].some((cell) => {
        if (!cell.classList.contains('monster') && !cell.classList.contains('item')) return true;
      })
    });
    var cells = document.querySelectorAll(`.room${roomIndex}`);
    cells = [...cells].filter((cell) => {
      if (cell.classList.contains('monster')||cell.classList.contains('item')) return false;
      return true;
    });
    var cellIndex = Math.floor(Math.random() * cells.length);
    cells[cellIndex].classList.add('player');
  }

  //These are for manual testing
  // createRoom(){
  //   const roomLength = this.rooms.length
  //   this.rooms.push(new Room(this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, this.tileSize, this.corridors[roomLength-1]));
  //   this.rooms[roomLength].createRoom(roomLength);
  // }
  //
  // createCorridor(){
  //   const roomLength = this.rooms.length - 1;
  //   this.corridors[roomLength] = new Corridor(this.rooms[roomLength], this.corridorLengthRange, this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, false)
  //   this.corridors[roomLength].createCorridor();
  // }
}

export default Map;
