import {combineReducers} from 'redux';
import mapReducer from './map';
import playerReducer from './player';
import dungeonReducer from './dungeon';
export default combineReducers({
  map: mapReducer,
  player:playerReducer,
  dungeon:dungeonReducer
});
