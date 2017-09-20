import IntRandom from '../utils/IntRandom';
import * as actions from '../actions/actions';

const initialState = {
  tileSize: 20,
  rows: 50,
  columns: 90, //max should be 80
  numRooms: new IntRandom(7, 8),
  roomWidth: new IntRandom(4, 7),
  roomHeight: new IntRandom(4, 7),
  corridorLength: new IntRandom(1, 3),
}

export default (state=initialState, action) => {
  switch(action.type){
    case actions.RESET:
      return initialState;
    case actions.GO_DOWN:
      return Object.assign({}, state, {
        numRooms: state.numRooms.increaseMinMax(4, 4),
        corridorLength: state.corridorLength.increaseMinMax(1, 1),
      });
    default:
      return state;
  }
}
