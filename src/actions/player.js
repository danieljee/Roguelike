import * as actions from './actions';


export function attackPlayer(damage){
  return {
    type:actions.ATTACK_PLAYER,
    damage
  };
}


export function drinkPotion(health){
  return{
    type:actions.DRINK_POTION,
    health
  };
}

export function levelUp(){
  return {
    type:actions.LEVEL_UP
  };
}

export function gainExperience(experience){
  return {
    type:actions.GAIN_EXPERIENCE,
    experience
  };
}

export function reset(){
  return{
    type:actions.RESET
  };
}

export function goDown(){
  return{
    type:actions.GO_DOWN
  };
}

export function gameover(){
  return{
    type:actions.GAMEOVER
  };
}
