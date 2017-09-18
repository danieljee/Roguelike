import {combineReducers} from 'redux';
import mapReducer from './map.js';
export default combineReducers({
  map: mapReducer
});
