import * as actions from './actions';


export const addMusic = (musicId) => {
  return {
    type:actions.ADD_MUSIC,
    musicId
  }
};

export const toggleMusic = () => {
  return{
    type:actions.TOGGLE_MUSIC
  }
}

export const turnOnOffMusic = () => (dispatch, getState) => {
  var state = getState();
  if (state.dungeon.musicOn){
    state.dungeon.musicId.pause();
  } else {
    state.dungeon.musicId.play();
  }
  dispatch(toggleMusic());
}
