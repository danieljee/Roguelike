import {DIRECTION} from './consts';


class Corridor{
  constructor(room, length, roomWidth, roomHeight, columns, rows, firstCorridor){
    const keys = Object.keys(DIRECTION);
    const enteringCorridorIndex = keys.indexOf(room.enteringCorridor);
    this.columns = columns;
    this.direction = DIRECTION[keys[Math.floor(Math.random() * 4 )]];
    var directionIndex = keys.indexOf(this.direction);
    this.oppositeDirection = DIRECTION[keys[(enteringCorridorIndex + 2) % 4]];
    if (!firstCorridor && this.direction === this.oppositeDirection){
      directionIndex++;
      directionIndex = directionIndex % 4;
      this.direction = DIRECTION[keys[directionIndex]];
    }
    this.corridorLength = length.random();
    this.maxLength = length.max;

    this.getPositionAndLength(room, roomWidth, roomHeight, columns, rows);
  }

  getPositionAndLength(room, roomWidth, roomHeight, columns, rows){
    switch(this.direction){
      case DIRECTION.NORTH:
        this.startXPos= Math.floor(Math.random() * (room.roomWidth)) + room.posX;
        this.startYPos = room.posY-1;
        this.maxLength = this.startYPos - roomHeight.min - 1;
        if (this.maxLength <= 1){
          switch(this.oppositeDirection){
            case DIRECTION.SOUTH:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.EAST;
              } else {
                this.direction = DIRECTION.WEST;
              }
              break;
            case DIRECTION.WEST:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.EAST;
              } else {
                this.direction = DIRECTION.SOUTH;
              }
              break;
            case DIRECTION.EAST:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.WEST;
              } else {
                this.direction = DIRECTION.SOUTH;
              }
              break;
            default:
          }
          this.getPositionAndLength(room, roomWidth, roomHeight, columns, rows);
        }
        return;
      case DIRECTION.EAST:
        this.startXPos = room.posX + room.roomWidth;
        this.startYPos = Math.floor(Math.random() * (room.roomHeight)) + room.posY;
        this.maxLength = (columns -1) - this.startXPos - roomWidth.min;
        if (this.maxLength <= 1){
          switch(this.oppositeDirection){
            case DIRECTION.SOUTH:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.NORTH;
              } else {
                this.direction = DIRECTION.WEST;
              }
              break;
            case DIRECTION.WEST:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.NORTH;
              } else {
                this.direction = DIRECTION.SOUTH;
              }
              break;
            case DIRECTION.NORTH:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.WEST;
              } else {
                this.direction = DIRECTION.SOUTH;
              }
              break;
            default:
          }
          this.getPositionAndLength(room, roomWidth, roomHeight, columns, rows);
        }
        return;
      case DIRECTION.SOUTH:
        this.startXPos = Math.floor(Math.random() * (room.roomWidth)) + room.posX;
        this.startYPos = room.posY + room.roomHeight;
        this.maxLength = (rows -1) - this.startYPos - roomHeight.min;
        if (this.maxLength <= 1){
          switch(this.oppositeDirection){
            case DIRECTION.NORTH:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.WEST;
              } else {
                this.direction = DIRECTION.EAST;
              }
              break;
            case DIRECTION.WEST:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.NORTH;
              } else {
                this.direction = DIRECTION.EAST;
              }
              break;
            case DIRECTION.EAST:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.WEST;
              } else {
                this.direction = DIRECTION.NORTH;
              }
              break;
            default:
          }
          this.getPositionAndLength(room, roomWidth, roomHeight, columns, rows);
        }
        return;
      case DIRECTION.WEST:
        this.startXPos = room.posX-1;
        this.startYPos = Math.floor(Math.random() * (room.roomHeight)) + room.posY;
        this.maxLength = this.startXPos - roomWidth.min - 1;
        if (this.maxLength <= 1){
          switch(this.oppositeDirection){
            case DIRECTION.NORTH:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.SOUTH;
              } else {
                this.direction = DIRECTION.EAST;
              }
              break;
            case DIRECTION.EAST:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.NORTH;
              } else {
                this.direction = DIRECTION.SOUTH;
              }
              break;
            case DIRECTION.SOUTH:
              if (Math.floor(Math.random() * 2) === 0){
                this.direction = DIRECTION.EAST;
              } else {
                this.direction = DIRECTION.NORTH;
              }
              break;
            default:
          }
          this.getPositionAndLength(room, roomWidth, roomHeight, columns, rows);
        }
        return;
      default:
    }
    //will this get called once?
    if (this.corridorLength < 1){
      this.corridorLength = 1;
    } else if (this.corridorLength > this.maxLength){
      this.corridorLength = this.maxLength;
    }
  }

  getEndPositionX(){
    if (this.direction === DIRECTION.NORTH || this.direction === DIRECTION.SOUTH){
      return this.startXPos;
    } else if (this.direction === DIRECTION.EAST){
      return this.startXPos + this.corridorLength - 1;
    }
    return this.startXPos - this.corridorLength + 1;
  }

  getEndPositionY(){
    if (this.direction === DIRECTION.EAST || this.direction === DIRECTION.WEST){
      return this.startYPos;
    } else if (this.direction === DIRECTION.NORTH){
      return this.startYPos - this.corridorLength + 1;
    }
    return this.startYPos + this.corridorLength - 1;
  }

  createCorridor(){
    this.endXPos = this.getEndPositionX();
    this.endYPos = this.getEndPositionY();
    if (this.direction === DIRECTION.EAST){
      for (let i=this.startXPos; i<=this.endXPos; i++){
        const id = i + this.startYPos * this.columns;
        const topWallId = i + (this.startYPos-1) * this.columns;
        const topWall = document.getElementById(topWallId);
        const cell = document.getElementById(id);
        if(cell.classList.contains('wall')){
          cell.classList.remove('wall');
          cell.classList.remove('wallTop');
        }
        if (topWall.classList.contains('wall')){
          topWall.classList.add('wallTop');
        }
      }
    } else if (this.direction === DIRECTION.WEST){
      for (let i=this.startXPos; i>=this.endXPos; i--){
        const id = i + this.startYPos * this.columns;
        const topWallId = i + (this.startYPos-1) * this.columns;
        const topWall = document.getElementById(topWallId);
        const cell = document.getElementById(id);
        if(cell.classList.contains('wall')){
          cell.classList.remove('wall');
          cell.classList.remove('wallTop');
        }
        if (topWall.classList.contains('wall')){
          topWall.classList.add('wallTop');
        }
      }
    } else if (this.direction === DIRECTION.NORTH){
      for (let i=this.startYPos; i>=this.endYPos; i--){
        const id = this.startXPos + i * this.columns;
        const cell = document.getElementById(id);
        if(cell.classList.contains('wall')){
          cell.classList.remove('wall');
          cell.classList.remove('wallTop');
        }
      }
    } else if (this.direction === DIRECTION.SOUTH){
      for (let i=this.startYPos; i<=this.endYPos; i++){
        const id = this.startXPos + i * this.columns;
        const cell = document.getElementById(id);
        if(cell.classList.contains('wall')){
          cell.classList.remove('wall');
          cell.classList.remove('wallTop');
        }
      }
    }
  }
}

export default Corridor;
