import * as actions from '../actions/actions';


const initialState = {
  health: 100,
  weapon: 'stick',
  power: 10,
  level: 1,
  nextLevel: 60,
  reset: false
}

export default (state=initialState, action) => {
  switch(action.type){
    case actions.RESET:
      return Object.assign({}, initialState, {
        reset: true
      });
    case actions.ATTACK_PLAYER:
      return Object.assign({}, state, {
        health: state.health - action.damage,
        reset: false
      });
    case actions.DRINK_POTION:
      return Object.assign({}, state, {
        health: state.health + action.health,
        reset: false
      });
    case actions.LEVEL_UP:
      return Object.assign({}, state, {
        health: state.health + 20,
        power: state.power + 12,
        nextLevel: (state.level+1) * 60,
        level: state.level + 1,
        reset: false
      });
    case actions.GAIN_EXPERIENCE:
      return Object.assign({}, state, {
        nextLevel: state.nextLevel - action.experience,
        reset: false
      });
    case actions.GO_DOWN:
      return Object.assign({}, state, {
        reset:false
      });
    default:
      return state;
  }
}
