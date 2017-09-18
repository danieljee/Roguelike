import IntRandom from '../utils/IntRandom';

const initialState = {
  tileSize: 15,
  rows: 50,
  columns: 90, //max should be 80
  numRooms: new IntRandom(50, 50),
  roomWidth: new IntRandom(4, 7),
  roomHeight: new IntRandom(4, 7),
  corridorLength: new IntRandom(1, 6),
}

export default (state=initialState, action) => {
  switch(action.type){
    default:
      return state;
  }
}
