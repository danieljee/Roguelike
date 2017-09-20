import IntRandom from '../utils/IntRandom';
import * as actions from '../actions/actions';
const initialState = {
  floor: 0,
  musicId: null,
  musicOn: true,
  weakMonsterExperience: 10,
  normalMonsterExperience:20,
  strongMonsterExperience: 30,
  bossExperience: 60,
  weakMonsterHealth: 50,
  normalMonsterHealth: 70,
  strongMonsterHealth: 100,
  bossHealth: 200,
  weakMonsterDamage: 5,
  normalMonsterDamage: 6,
  strongMonsterDamage: 7,
  bossDamage: 13,
  weakMonsters: new IntRandom(4, 6),
  normalMonsters: new IntRandom(2, 3),
  strongMonsters:new IntRandom(0, 1),
  numberOfPotions: new IntRandom(5, 7),
}

export default (state=initialState, action) => {
  switch(action.type){
    case actions.RESET:
      return initialState;
    case actions.GO_DOWN:
      return Object.assign({}, state, {
        floor: state.floor-1,
        weakMonsterExperience: state.weakMonsterExperience + 10,
        normalMonsterExperience: state.normalMonsterExperience + 10,
        strongMonsterExperience: state.strongMonsterExperience + 10,
        weakMonsterDamage: state.weakMonsterDamage + 1,
        normalMonsterDamage: state.normalMonsterDamage + 2,
        strongMonsterDamage: state.strongMonsterDamage + 3,
        weakMonsters: state.weakMonsters.increaseMinMax(2,2),
        normalMonsters: state.normalMonsters.increaseMinMax(2,2),
        strongMonsters: state.strongMonsters.increaseMinMax(2,2),
        numberOfPotions: state.numberOfPotions.increaseMinMax(2, 2)
      });
    case actions.ADD_MUSIC:
      return Object.assign({}, state, {
        musicId: action.musicId
      });
    case actions.TOGGLE_MUSIC:
      return Object.assign({}, state, {
        musicOn: !state.musicOn
      });
    default:
      return state;
  }
}
