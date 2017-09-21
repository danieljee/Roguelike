import React, { Component } from 'react';
import {connect} from 'react-redux';
import gameoverAnimation from '../utils/gameoverAnimation';
import * as actions from '../actions/dungeon';
import $ from 'jquery';
class Gameover extends Component{
  componentDidMount(){
    gameoverAnimation();
  }
  render(){
    return(
      <div>
        <canvas id="canvas"></canvas>
        <h4 id='gameoverMessage'>Congrats!<br/> You defeated the boss!</h4>
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
