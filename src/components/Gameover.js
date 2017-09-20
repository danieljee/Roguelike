import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/dungeon';
class Gameover extends Component{
  render(){
    return(
      <div className="center-align" style={{marginTop:'20px'}}>
        <h5>Game Over!</h5>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    dungeon: state.dungeon
  };
}

export default connect(mapStateToProps,actions)(Gameover);
