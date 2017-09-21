/*
  posX will be the position of the room's lower left corner from map's leftmost
  posY will be the position of the room's lower left corner from map's lowermost

*/

import {DIRECTION} from './consts';
import clamp from './clamp';

class Room {
  constructor(width, height, columns, rows, tileSize, corridor){
    this.tileSize = tileSize;
    this.roomWidth = width.random();
    this.roomHeight = height.random();
    this.columns = columns;
    this.rows = rows;
    if (!corridor){
      this.posX = Math.ceil(columns/2 - this.roomWidth/2);
      this.posY = Math.ceil(rows/2 - this.roomHeight/2);
    } else {
      this.enteringCorridor = corridor.direction;
      var corridorEndPosY = corridor.getEndPositionY();
      var corridorEndPosX = corridor.getEndPositionX();
      switch(corridor.direction){
        case DIRECTION.NORTH:
          this.roomHeight = clamp(this.roomHeight, 1, corridorEndPosY - 1);
          this.posY = corridorEndPosY - this.roomHeight;
          var minX = corridorEndPosX - this.roomWidth + 1;
          this.posX = Math.floor(Math.random() * (corridorEndPosX - minX + 1)) + minX;
          this.posX = clamp(this.posX, 1, (columns- 1) - this.roomWidth);
          return;
        case DIRECTION.EAST:
          this.roomWidth = clamp(this.roomWidth, 1, (columns-1) - (corridorEndPosX+1));
          this.posX = corridorEndPosX + 1;
          var minY = corridorEndPosY - this.roomHeight + 1;
          this.posY = Math.floor(Math.random() * (corridorEndPosY - minY + 1)) + minY;
          this.posY = clamp(this.posY, 1, (rows - 1) - this.roomHeight);
          return;
        case DIRECTION.SOUTH:
          this.roomHeight = clamp(this.roomHeight, 1, (rows-2)-corridorEndPosY);
          this.posY = corridorEndPosY+1;
          var minX = corridorEndPosX - this.roomWidth + 1;
          this.posX = Math.floor(Math.random() * (corridorEndPosX - minX + 1)) + minX;
          this.posX = clamp(this.posX, 1, (columns- 1) - this.roomWidth);
          return;
        case DIRECTION.WEST:
          this.roomWidth = clamp(this.roomWidth, 1, corridorEndPosX - 1);
          this.posX = corridorEndPosX - this.roomWidth;
          var minY = corridorEndPosY - this.roomHeight + 1;
          this.posY = Math.floor(Math.random() * (corridorEndPosY - minY + 1)) + minY;
          this.posY = clamp(this.posY, 1, (rows - 1) - this.roomHeight);
          return;
        default:
      }
    }
  }

  createRoom(roomNum){
    function removeRoomName(className){
      if (regex.test(className)){
        cell.classList.remove(className);
      }
    }
    for (let i=this.posY; i<(this.posY+this.roomHeight); i++){
      for (let n=this.posX; n<(this.posX+this.roomWidth); n++){
        const id = n + i * this.columns;
        var cell = document.getElementById(id);

        if (i === this.posY){
          const topWallId = n + (i-1) * this.columns;
          const topWall = document.getElementById(topWallId);
          if (topWall.classList.contains('wall')){
            topWall.classList.add('wallTop');
          }
        }

        if (cell.classList.contains('wall')){
          cell.classList.remove('wall');
          cell.classList.remove('wallTop');
        }

        var regex = /^room/;

        //if the tile already has other room name remove it.
        cell.classList.forEach(removeRoomName);
        cell.classList.add(`room${roomNum}`);
        if (cell.classList.contains('corridor')){
          cell.classList.remove('corridor');
        }
      }
    }
  }
}

export default Room;
